const path = require("path");
const usersFilePath = path.join(__dirname, "..", "data", "users.json");
const { getJsonFromFile } = require("../helpers/files");

const getUsers = async (req, res) => {
  try {
    const users = await getJsonFromFile(usersFilePath);
    res.send(users);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

const getUserById = async (req, res) => {
  try {
    const users = await getJsonFromFile(usersFilePath);
    const user = users.find((user) => user.id === req.params.user_id);
    if (!user) {
      res.status(404).send("User ID not found");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

module.exports = { getUsers, getUserById };
