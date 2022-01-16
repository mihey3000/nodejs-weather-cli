import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
  console.log(`${chalk.bgRed.bold(" Error ")} ${error}`);
};

const printSuccess = (msg) => {
  console.log(`${chalk.bgGreen.bold(" Success ")} ${msg}`);
};

const printHelp = () => {
  console.log(
    dedent(` ${chalk.black.bgYellow(" Help ")}
			Без параметров - вывод погоды
			-h - подсказки
			-s [city] - сохранить город
			-t [api_key] - сохранить токен`)
  );
};

export { printError, printSuccess, printHelp };
