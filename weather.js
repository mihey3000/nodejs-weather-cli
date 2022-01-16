#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { printHelp, printSuccess, printError } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Не передан токен!");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Токен сохранен!");
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("Не передан город!");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess("Город сохранен!");
  } catch (e) {
    printError(e.message);
  }
};

const getForcast = async () => {
  try {
    const weather = await getWeather(process.env.CITY ?? TOKEN_DICTIONARY.city);
    // const weather = await getWeather("moscow");
    console.log(weather);
  } catch (e) {
    if (e?.response?.status == 404) {
      printError("Не верно указан город!");
    } else if (e?.response?.status == 401) {
      printError("Не верно указан токен!");
    } else {
      printError(e.message);
    }
  }
};

const initCLI = () => {

  const args = getArgs(process.argv);
  
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    // сохранить город
    return saveCity(args.s)
  }
  if (args.t) {
    // сохранить токен
    return saveToken(args.t);
  }
  // вывести погоду
  return getForcast();
};

initCLI();
