const currentBalances = {};

const eventHandlersMap = {
  // probably we should handle the "balanceUpdate" event too
  // in this case just add handler and the event hereß
  'outboundAccountPosition': handleAccountUpdate,
};

function handleAccountUpdate(eventPayload) {
  const balance = eventPayload.B[0];
  
  currentBalances[balance.a] = {
    free: balance.f,
    locked: balance.l,
  };
}

function isBalancePositive(balance) {
  return parseFloat(balance.free) > 0;
}

function printBalances(options = {}) {
  const { printPositive } = options;

  console.log(`${printPositive && 'Positive '}Balances:`);

  Object.keys(currentBalances).forEach(asset => {
    const balance = currentBalances[asset];

    if (!printPositive || isBalancePositive(balance)) {
      console.log(`${asset}: ${balance.free}`);
    } 
  })
}

exports.storeBalances = function(balances) {
  balances.forEach(({ asset, free, locked }) => {
    currentBalances[asset] = { free, locked };
  });
}

exports.handleBalancesEvent = function (eventPayload) {
  const handler = eventHandlersMap[eventPayload.e];

  if (!handler) {
    return;
  }

  handler(eventPayload);
  printBalances();
}

exports.printBalances = printBalances;