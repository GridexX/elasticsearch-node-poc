'use strict'

const { Client } = require('@elastic/elasticsearch')
const elasticUrl = process.env.ELASTIC_URL || "https://es01:9200";
const elasticPassword = process.env.ELASTIC_PASSWORD || "elastic";
const elacticUser = process.env.ELASTIC_USER || "elastic";
const client = new Client({ node: elasticUrl, auth: { username: elacticUser, password: elasticPassword } });

const express = require("express");
const app = express();

const winston = require('winston');
const expressWinston = require('express-winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.json()
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));

const { populateDB } = require("./data/populateDB");
const route = "/content";
const index = "content";
const port = "3000";

//Call populateDB if index is empty
(async () => {
  const indexExists = await client.indices.exists({ index: index });
  if (!indexExists) {
    logger.info("Index is empty, populating DB");
    populateDB(client, index);
  }
})();


async function run() {

  const result = await client.search({
    index: index,
    query: {
      match: { description: "in" }
    }
  })

  console.log(result.hits.hits)
}

app.get(route, async (req, res) => {

  let matchers = [];
  let filters = [];
  const queryParam = req.query;
  logger.info("Query parameters: ", queryParam)

  // Match by score for description and name
  if (queryParam?.description) {
    matchers.push({ match: { description: queryParam.description } });
  }

  if (queryParam?.name) {
    matchers.push({ match: { name: queryParam.name } });
  }


  if (queryParam?.tags) {
    filters.push({ term: { tags: queryParam.tags } });
  }

  if (queryParam?.author) {
    filters.push({ term: { author: queryParam.author } });
  }


  if (matchers.length < 1 && filters.length < 1) {
    logger.error("No query parameters found")
    res.status(400).send({ error: "No query parameters found" });
    return;
  }
  let query = {}
  if (matchers.length > 0) {
    query.must = matchers;
  }

  if (filters.length > 0) {
    if (matchers.length < 1)
      query.must = [];
    query.filter = filters;
  }


  try {

    const result = await client.search({
      index: index,
      query: {
        bool: query
      }
    })
    res.send(result.hits.hits)
  } catch (error) {
    logger.error("Error while searching: ", error);
    res.status(500).send({ error: "Error while searching" });
    return;
  }

});


app.listen(port, () => console.log(`Server ready on port ${port}`));

