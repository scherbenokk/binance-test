const loadBalancesAndPrintPositive = require('tasks/load-balances-and-print-positive');
const watchBalancesEvents = require('tasks/watch-balances-events');

async function main() {
  await loadBalancesAndPrintPositive();
  await watchBalancesEvents();
}

main();

