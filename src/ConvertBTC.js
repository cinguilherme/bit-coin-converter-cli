/* eslint-disable no-console */
const request = require('request');
const chalk = require('chalk');

function convertBTC(currency = 'USD', amount = 1) {
  const url =
    `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;

  request(url, (error, response, body) => {
    let apiResponse;
    try {
      apiResponse = JSON.parse(body);

      const output = `${chalk.red(amount)} BTC to ${chalk.cyan(currency)} = ${chalk.yellow(apiResponse.price)}`;

      console.log(output);
    } catch (parseError) {
      console.log(chalk.red('Error'));
    }
  });
}

module.exports = convertBTC;
