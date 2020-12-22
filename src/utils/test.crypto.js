const crypto = require('crypto');

const { TESTNET_API_SECRET } = process.env;

if (!TESTNET_API_SECRET) {
  throw new Error('Missing env param: TESTNET_API_SECRET');
}

const cipher = crypto.createHmac('sha256', TESTNET_API_SECRET);

module.exports = {
  generateSignature,
};

function generateSignature(messageToSign) {
  return cipher.update(messageToSign).digest('hex');
}