/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const nock = require('nock');
const chalk = require('chalk');

chai.use(sinonChai);

const convertBTC = require('../src/ConvertBTC');

describe('ConvertBTC', () => {
  let consoleStub;

  const responseMock = {
    success: true,
    time: '14-04-2016 13:55:32',
    price: 424.93,
  };

  const responseMockBRL = {
    success: true,
    time: '14-04-2016 13:55:32',
    price: 1000.93,
  };

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log');
  });

  afterEach(() => {
    // eslint-disable-next-line no-console
    console.log.restore();
  });

  context('bitcoin avarage api NOCK', () => {
    it(`should perform the request to bitcoin avarage with
     default data and receive default infos`, (done) => {
        nock('https://apiv2.bitcoinaverage.com')
          .get('/convert/global')
          .query({ from: 'BTC', to: 'USD', amount: 1 })
          .reply(200, responseMock);

        convertBTC();

        setTimeout(() => {
          expect(consoleStub).to.have.been
            .calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(424.93)}`);
          done();
        }, 100);
      });

    it('should use BRL and amount 10', (done) => {
      nock('https://apiv2.bitcoinaverage.com')
        .get('/convert/global')
        .query({ from: 'BTC', to: 'BRL', amount: 10 })
        .reply(200, responseMockBRL);

      convertBTC('BRL', 10);

      setTimeout(() => {
        expect(consoleStub).to.have.been
          .calledWith(`${chalk.red(10)} BTC to ${chalk.cyan('BRL')} = ${chalk.yellow(1000.93)}`);
        done();
      }, 100);
    });

    it('should use BRL and amount 10', (done) => {
      nock('https://apiv2.bitcoinaverage.com')
        .get('/convert/global')
        .query({ from: 'BTC', to: 'BRL', amount: 1 })
        .reply(200, responseMockBRL);

      convertBTC('BRL');

      setTimeout(() => {
        expect(consoleStub).to.have.been
          .calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('BRL')} = ${chalk.yellow(1000.93)}`);
        done();
      }, 100);
    });

    context('error with api call', () => {
      it('should report to user if api replies with error', (done) => {
        nock('https://apiv2.bitcoinaverage.com')
          .get('/convert/global')
          .query({ from: 'BTC', to: 'BRL', amount: 1 })
          .replyWithError('Error');

        convertBTC('BRL');

        setTimeout(() => {
          expect(consoleStub).to.have.been.calledWith(chalk.red('Error'));
          done();
        }, 100);
      });
    });
  });
});
