#!/usr/bin/env node

const pkg = require('../package.json');
const commander = require('commander');

commander
  .version(pkg.version)
  .description(pkg.description)
  .parse(process.argv);
