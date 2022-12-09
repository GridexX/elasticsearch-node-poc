const { esclient, index, type } = require("../elastic");
const quotes = require("./quotes.json");

const esAction = {
  index: {
    _index: index,
    _type: type
  }
};

async function populateDatabase() {
  const docs = [];
  for (const quote of quotes) {
    docs.push(esAction);
    docs.push(quote);
  }
  return esclient.bulk({ body: docs });
}

module.exports = {
  populateDatabase
}