#!/usr/bin/env node

const pkg = require('../package.json');
const commander = require('commander');
const convertBTC = require('./ConvertBTC');

commander
  .version(pkg.version)
  .description(pkg.description)
  .option('-C, --currency <currency>', 'Currency to be converted. (default: USD)')
  .option('-A, --amount <amount>', 'Amount to be converted. (default: 1)')
  .parse(process.argv);

convertBTC(commander.currency, commander.amount);
