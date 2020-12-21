const WebSocket = require('ws');
const wsApiUrl = 'wss://testnet.binance.vision';

exports.createSocket = function (listenKey) {
  return new WebSocket(`${wsApiUrl}/ws/${listenKey}`);
};