const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const exec = require('child_process').exec;

const bitcoinConverter = 'node.exe ./src/main.js';

describe('Main', () => {
  it('should return string "Hello World!"', (done) => {
    exec(bitcoinConverter, (err, stdout) => {
      if (err) throw err;
      expect(stdout.replace('\n', '')).to.be.equals('Hello World!');
      done();
    });
  });
});
