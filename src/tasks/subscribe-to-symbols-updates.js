const { createMainnetSocket } = require('utils/socket');

const LATENCY_STATISTICS_INTERVAL_MSEC = 60000;

const eventsStatistics = {
  minTime: Infinity,
  maxTime: 0,
  eventsCount: 0,
  meanTime: 0,
};

function updateEventsStatistics(eventData) {
  // It's not clear what is a latency for an event:
  // 1. event time -(minus) trade time
  // 2. Date.now() -(minus) event time(or even trade time)
  // I assume that it's the second option
  // but in any case it's easy to switch to the first approach of latency calculation

  const eventLatency = Date.now() - eventData.E; // or eventData.E - eventData.T

  if (eventLatency < eventsStatistics.minTime) {
    eventsStatistics.minTime = eventLatency;
  }

  if (eventLatency > eventsStatistics.maxTime) {
    eventsStatistics.maxTime = eventLatency;
  }

  eventsStatistics.meanTime = (eventsStatistics.meanTime * eventsStatistics.eventsCount + eventLatency) / (eventsStatistics.eventsCount + 1);
  eventsStatistics.eventsCount += 1;
}

module.exports = async function subscribeToSymbolsUpdates(symbols) {
  if (!symbols || !Array.isArray(symbols)) {
    return [];
  }

  symbols.forEach(symbol => {
    const ws = createMainnetSocket(`${symbol.toLowerCase()}@trade`);

    ws.on('open', () => { /* console.log(`Subscribed to ${symbol} symbol`); */ });
    ws.on('close', () => { /* console.log('Cancel listening ${symbol} symbol updates'); */ });
    ws.on('message', data => { updateEventsStatistics(JSON.parse(data)); });
  });

  setInterval(() => {
    console.log(`
      Event stats:
      Min Time: ${eventsStatistics.minTime},
      Max Time: ${eventsStatistics.maxTime},
      Mean Time: ${eventsStatistics.meanTime},
    `);
  }, LATENCY_STATISTICS_INTERVAL_MSEC);
}
