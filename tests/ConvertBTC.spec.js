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

  const badJson = `{
    error: error,
  }`;

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'info');
  });

  afterEach(() => {
    // eslint-disable-next-line no-console
    consoleStub.restore();
  });

  context('bitcoin avarage api NOCK', () => {
    it('should perform default infos', async () => {
      nock('https://apiv2.bitcoinaverage.com')
        .get('/convert/global')
        .query({ from: 'BTC', to: 'USD', amount: 1 })
        .reply(200, responseMock);

      await convertBTC();

      expect(consoleStub).to.have.been
        .calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(424.93)}`);
    });

    it('should use BRL and amount 10', async () => {
      nock('https://apiv2.bitcoinaverage.com')
        .get('/convert/global')
        .query({ from: 'BTC', to: 'BRL', amount: 10 })
        .reply(200, responseMockBRL);

      await convertBTC('BRL', 10);

      expect(consoleStub).to.have.been
        .calledWith(`${chalk.red(10)} BTC to ${chalk.cyan('BRL')} = ${chalk.yellow(1000.93)}`);
    });

    it('should use BRL and amount 10', async () => {
      nock('https://apiv2.bitcoinaverage.com')
        .get('/convert/global')
        .query({ from: 'BTC', to: 'BRL', amount: 1 })
        .reply(200, responseMockBRL);

      await convertBTC('BRL');
      expect(consoleStub).to.have.been
        .calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('BRL')} = ${chalk.yellow(1000.93)}`);
    });

    context('error with api call', () => {
      it('should report to user if api replies with error', async () => {
        nock('https://apiv2.bitcoinaverage.com')
          .get('/convert/global')
          .query({ from: 'BTC', to: 'BRL', amount: 1 })
          .replyWithError('Error');

        await convertBTC('BRL');
        expect(consoleStub).to.have.been.calledWith(chalk.red('Error'));
      });
    });
  });
});
