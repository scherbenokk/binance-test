const WebSocket = require('ws');

const wsTestnetUrl = 'wss://testnet.binance.vision';
const wsMainnetUrl = 'wss://stream.binance.com:9443';

function makeSocketConstructor(isMainnet) {
  const url = isMainnet ? wsMainnetUrl : wsTestnetUrl;

  return function (streamName) {
    return new WebSocket(`${url}/ws/${streamName}`);
  }
}

exports.createTestnetSocket = makeSocketConstructor(false);
exports.createMainnetSocket = makeSocketConstructor(true);