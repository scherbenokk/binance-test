const { createListenKey, renewListenKey } = require('utils/api/test');
const { createTestnetSocket } = require('utils/socket');
const { printBalances } = require('balances/utils');
const { getBalances, setBalance } = require('balances/storage');

const LISTEN_KEY_REFRESH_INTERVAL_MSEC = 1200000; // 20 minutes

const eventHandlersMap = {
  // probably we should handle the "balanceUpdate" event too
  // in this case just add handler and the event here
  'outboundAccountPosition': handleAccountUpdate,
};

function handleAccountUpdate(eventPayload) {
  const balance = eventPayload.B[0];

  setBalance(balance.a, {
    free: balance.f,
    locked: balance.l,
  });
}

function handleBalancesEvent(eventPayload) {
  const handler = eventHandlersMap[eventPayload.e];

  if (!handler) {
    return;
  }

  handler(eventPayload);
  printBalances(getBalances());
}

async function refreshListenKey() {
  try {
    await renewListenKey();
  } catch (err) {
    console.log('Some error has happened during listen key refreshing', err);
    return;
  }
}

module.exports = async function watchBalancesEvents() {
  let response;
  
  try {
    response = await createListenKey();
  } catch (err) {
    console.log('Some error has happened during listen key obtaining', err);
    return;
  }

  const listenKey = response.listenKey;

  const ws = createTestnetSocket(listenKey);

  ws.on('open', () => { /* console.log('Listen to balances updates'); */ });
  ws.on('close', () => { /* console.log('Cancel listening balances updates'); */ });
  ws.on('message', data => { handleBalancesEvent(JSON.parse(data)); });

  setInterval(refreshListenKey, LISTEN_KEY_REFRESH_INTERVAL_MSEC);
}
