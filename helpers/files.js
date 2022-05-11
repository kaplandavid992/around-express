const fsPromises = require('fs').promises;

const getJsonFromFile = (filePath) => fsPromises
  .readFile(filePath, { encoding: 'utf8' })
  .then((file) => JSON.parse(file));

module.exports = { getJsonFromFile };
