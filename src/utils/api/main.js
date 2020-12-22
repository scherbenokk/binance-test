const configureHttps = require('utils/https');

const { MAINNET_API_KEY } = process.env;

if (!MAINNET_API_KEY) {
  throw new Error('Missing env param: MAINNET_API_KEY');
}

const https = configureHttps({
  baseURL: 'https://api.binance.com/api/v3',
  headers: { "X-MBX-APIKEY": MAINNET_API_KEY },
});

module.exports = {
  get24hrStatistics,
};

function get24hrStatistics() {
  return https.get('/ticker/24hr');
}