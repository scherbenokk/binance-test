const { getAccountInfo } = require('utils/api');
const { storeBalances, printBalances } = require('balances/service');

async function loadBalancesAndPrintPositive() {
  let accountInfo;
  
  try {
    accountInfo = await getAccountInfo();
  } catch (err) {
    console.log('Some error has happened', err.response.data);
    return;
  }

  if (Array.isArray(accountInfo.data.balances)) {
    storeBalances(accountInfo.data.balances);
    printBalances({ printPositive: true });
  } 
}

module.exports = loadBalancesAndPrintPositive;