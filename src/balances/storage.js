const currentBalances = {};

exports.getBalances = () => {
  return Object.keys(currentBalances).reduce((acc, asset) => {
    acc.push({
      ...currentBalances[balanceKey],
      asset,
    });
    return acc;
  }, []);
};

function setBalance(balance) {
  currentBalances[balance] = balance;
};

exports.setBalance = setBalance;

exports.setBalances = (balances) => {
  balances.forEach(({ asset, free, locked }) => {
    setBalance(asset, { free, locked });
  });
}