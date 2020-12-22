const configureHttps = require('utils/https');
const { generateSignature } = require('../test.crypto');

const { TESTNET_API_KEY } = process.env;

if (!TESTNET_API_KEY) {
  throw new Error('Missing env param: TESTNET_API_KEY');
}

const https = configureHttps({
  baseURL: 'https://testnet.binance.vision/api/v3',
  headers: { "X-MBX-APIKEY": TESTNET_API_KEY },
});

module.exports = {
  getAccountInfo,
  createListenKey,
  renewListenKey,
};

function getAccountInfo() {
  const apiParamsString = `timestamp=${Date.now()}`;

  return https.get(`/account?${apiParamsString}&signature=${generateSignature(apiParamsString)}`);
}

function createListenKey() {
  return https.post('/userDataStream');
}

function renewListenKey() {
  return https.put('/userDataStream');
}