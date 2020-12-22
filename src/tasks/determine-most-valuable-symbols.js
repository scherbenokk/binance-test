const { get24hrStatistics } = require('utils/api/main');

// TODO: check if symbolsNumber variable does not exist or symbolNumber is not number
module.exports = async function determineMostValuableSymbols(symbolsNumber) {
  let statistics;
  
  try {
    statistics = await get24hrStatistics();
  } catch (err) {
    console.log('Some error has happened during statistics obtaining', err.response.data);
    return [];
  }

  statistics = statistics.data;

  return [...statistics].sort((a, b) => {
    if (parseFloat(a.volume) > parseFloat(b.volume)) {
      return -1;
    }

    if (parseFloat(a.volume) < parseFloat(b.volume)) {
      return 1;
    }

    return 0;
  })
  .slice(0, symbolsNumber)
  .map(({ symbol }) => symbol);
}

