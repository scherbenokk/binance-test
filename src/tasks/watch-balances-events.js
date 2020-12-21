const { createListenKey, renewListenKey } = require('utils/api');
const { createSocket } = require('utils/socket');
const { handleBalancesEvent } = require('balances/service');

const TWENTY_MINUTES_IN_MSEC = 1200000;

async function refreshListenKey() {
  try {
    await renewListenKey();
  } catch (err) {
    console.log('Some error has happened during listen key refreshing', err.response.data);
    return;
  }
}

module.exports = async function watchBalancesEvents() {
  let listenKey;
  
  try {
    listenKey = await createListenKey();
  } catch (err) {
    console.log('Some error has happened during listen key obtaining', err.response.data);
    return;
  }

  listenKey = listenKey.data.listenKey;

  const ws = createSocket(listenKey);

  ws.on('open', function open(dto) {
    console.log('Listen to balances updates');
  });
  
  ws.on('close', function close() {
    console.log('Cancel listening balances updates');
  });
  
  ws.on('message', function incoming(data) {
    console.log('event', data);
    handleBalancesEvent(data);
  });

  // refresh listenKey every 20 minutes
  // TODO: add error handling
  setInterval(refreshListenKey, TWENTY_MINUTES_IN_MSEC);
}

