const { getAccountInfo } = require('utils/api/test');
const { printBalances } = require('balances/utils');
const { setBalances } = require('balances/storage');

async function loadBalancesAndPrintPositive() {
  let accountInfo;
  
  try {
    accountInfo = await getAccountInfo();
  } catch (err) {
    console.log('Some error has happened', err);
    return;
  }

  const balances = accountInfo.balances;

  if (Array.isArray(balances)) {
    setBalances(balances);
    printBalances(balances, { printPositive: true });
  } 
}

module.exports = loadBalancesAndPrintPositive;