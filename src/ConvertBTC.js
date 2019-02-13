/* eslint-disable no-console */
const request = require('request-promise-native');
const chalk = require('chalk');
const ora = require('ora');

function convertBTC(currency = 'USD', amount = 1) {
  const url =
    `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;

  const spinner = ora({
    text: 'Loading bitcoin data..',
    color: 'green',
  });

  spinner.start();

  return request(url)
    .then((body) => {
      spinner.stop();
      return body;
      // eslint-disable-next-line consistent-return
    }).then((body) => {
      const apiResponse = JSON.parse(body);
      spinner.stop();
      const output = `${chalk.red(amount)} BTC to ${chalk.cyan(currency)} = ${chalk.yellow(apiResponse.price)}`;
      console.info(output);
    }).catch((err) => {
      console.info(chalk.red('Error'));
      return err;
    });
}
module.exports = convertBTC;
