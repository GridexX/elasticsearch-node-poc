contentsString = require("./contents.json")
const { v4: uuidv4 } = require('uuid');

async function populateDB(client, index) {
  contents = contentsString
  contents.map(content => {
    content.id = uuidv4()
  })

  const operations = contents.flatMap(doc => [{ index: { _index: index } }, doc])

  const bulkResponse = await client.bulk({ refresh: true, operations })

  if (bulkResponse.errors) {
    const erroredDocuments = []
    // The items array has the same order of the dataset we just indexed.
    // The presence of the `error` key indicates that the operation
    // that we did for the document has failed.
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0]
      if (action[operation].error) {
        erroredDocuments.push({
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
          status: action[operation].status,
          error: action[operation].error,
          operation: body[i * 2],
          document: body[i * 2 + 1]
        })
      }
    })
    console.log(erroredDocuments)
  }

}

module.exports = {
  populateDB
}