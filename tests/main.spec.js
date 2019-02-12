const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const exec = require('child_process').exec;

const isWin = process.platform === 'win32';
const bitcoinConverter = isWin ? 'node.exe ./src/main.js' : './src/main.js';

const pkg = require('../package.json');

describe('Main', () => {
  it('should return string the version of the cli when --version', (done) => {
    exec(`${bitcoinConverter} --version`, (err, stdout) => {
      if (err) throw err;
      expect(stdout.replace('\n', '')).to.be.equals(pkg.version);
      done();
    });
  });

  it('should return string description of the cli when --help', (done) => {
    exec(`${bitcoinConverter} --help`, (err, stdout) => {
      if (err) throw err;
      console.log(stdout);
      expect(stdout.includes(pkg.description)).to.be.true;
      done();
    });
  });
});
