const axios = require('axios');
const { generateSignature } = require('./crypto');

const { TESTNET_API_KEY } = process.env;

if (!TESTNET_API_KEY) {
  throw new Error('Missing env param: TESTNET_API_KEY');
}

const testnetApiUrl = 'https://testnet.binance.vision/api/v3';

module.exports = {
  getAccountInfo,
  createListenKey,
  renewListenKey,
};

function getAccountInfo() {
  const apiParamsString = `timestamp=${Date.now()}`;

  return axios({
    method: 'get',
    url: `${testnetApiUrl}/account?${apiParamsString}&signature=${generateSignature(apiParamsString)}`,
    headers: {
      "X-MBX-APIKEY": TESTNET_API_KEY,
    },
  });
}

function createListenKey() {
  return axios({
    method: 'post',
    url: `${testnetApiUrl}/userDataStream`,
    headers: {
      "X-MBX-APIKEY": TESTNET_API_KEY,
    },
  });
}

function renewListenKey() {
  return axios({
    method: 'put',
    url: `${testnetApiUrl}/userDataStream`,
    headers: {
      "X-MBX-APIKEY": TESTNET_API_KEY,
    },
  });
}