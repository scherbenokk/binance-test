const loadBalancesAndPrintPositive = require('tasks/load-balances-and-print-positive');
const watchBalancesEvents = require('tasks/watch-balances-events');
const determineMostValuableSymbols = require('tasks/determine-most-valuable-symbols');
const subscribeToSymbolsUpdates = require('tasks/subscribe-to-symbols-updates');

const MOST_VALUABLE_SYMBOLS_NUMBER = 10;

async function main() {
  try {
    // testnet tasks
    await loadBalancesAndPrintPositive();
    await watchBalancesEvents();

    // mainnet tasks
    const mostValuableSymbols = await determineMostValuableSymbols(MOST_VALUABLE_SYMBOLS_NUMBER);
    await subscribeToSymbolsUpdates(mostValuableSymbols);
  } catch (err) {
    console.error('Some global error has happened', err);
  }
}

main();

