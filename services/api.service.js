import axios from "axios";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";
import dedent from "dedent-js";

const getWeather = async () => {
  const token =
    process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));
  const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));

  if (!token) {
    throw new Error(
      "Не задан API ключ, зарегистрируйтесь на сайте https://openweathermap.org/ и задайте api ключ через команду -t [API_KEY]"
    );
  }

  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: token,
        lang: "ru",
        units: "metric",
      },
    }
  );

  //   return data;

  const temperature = data.main.temp
    .toString()
    .replace(/[\.|\,][0-9]{1,}$/, "");

  const windSpeed = data.wind.speed.toString().replace(/[\.|\,][0-9]{1,}$/, "");
  const feelsLike = data.main.feels_like
    .toString()
    .replace(/[\.|\,][0-9]{1,}$/, "");

  return dedent(`Город: ${data.name}  (${data.weather[0].description})
  Температура: ${temperature} °C   (ощущается как: ${feelsLike} °C)
  Влажность: ${data.main.humidity} %     
  Ветер: ${windSpeed} м/с`);
};

export { getWeather };
