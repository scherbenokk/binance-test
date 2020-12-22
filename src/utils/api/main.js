const axios = require('axios');

const { MAINNET_API_KEY } = process.env;

if (!MAINNET_API_KEY) {
  throw new Error('Missing env param: MAINNET_API_KEY');
}

const http = axios.create({
  baseURL: 'https://api.binance.com/api/v3',
  headers: { "X-MBX-APIKEY": MAINNET_API_KEY },
});

module.exports = {
  get24hrStatistics,
};

function get24hrStatistics() {
  return http.get('/ticker/24hr');
}