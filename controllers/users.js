const path = require('path');
const User = require('../models/user')

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).send({ message: 'User ID not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong' });
  }
};

const createUser = async (req, res) => {

  const { name, about, avatar } = req.body;
   await User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};

module.exports = { getUsers, getUserById, createUser};
