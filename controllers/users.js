const path = require('path');
const { send } = require('process');
const User = require('../models/user')

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).orFail(()=> {
     const error = new Error("No user found with that id");
     error.statusCode = 404;
    }).then(users => res.send(users));
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong' });
  }
};

const getUserById = async (req, res) => {
    const user = await User.findById(req.params.userId).orFail(() => {
    const error = new Error({ message: 'User ID not found' });
    error.statusCode = 404;
    res.send(error);
    throw error;
    }).then(user=>res.send(user)).catch((error)=> {
    res.status(500).send({ message: 'Something went wrong' });
  });
}

const createUser = async (req, res) => {

  const { name, about, avatar } = req.body;
   await User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};

module.exports = { getUsers, getUserById, createUser};
