function isBalancePositive(balance) {
  return parseFloat(balance.free) > 0;
}

exports.printBalances = function(balances, options = {}) {
  const { printPositive } = options;

  console.log(`${printPositive && 'Positive '}Balances:`);

  balances.forEach(balance => {
    if (!printPositive || isBalancePositive(balance)) {
      console.log(`${balance.asset}: ${balance.free}`);
    }
  })
}