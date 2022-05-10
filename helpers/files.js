const fsPromises = require("fs").promises;
const getJsonFromFile = (filePath) => {
  return fsPromises.readFile(filePath, { encoding: "utf8" }).then((file) => {
    return JSON.parse(file);
  });
};

module.exports = { getJsonFromFile };
