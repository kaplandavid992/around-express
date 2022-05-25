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
  const user = await User.findById(req.params.userId)
   .orFail(()=> {
    const error = new Error("user id not found");
    error.statusCode = 404;
    throw error;
    });
    res.send(user).catch((error) => {
       res.status(500).send({ message: 'Something went wrong' });})
}


const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
   await User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};

const updateProfile = async (req, res) => {
  const id = req.user._id;
  const { name, about } = req.body;
   await User.replaceOne({ name, about })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};

const updateAvatar = async (req, res) => {
  const id = req.user._id;
  const { avatar } = req.body;
   await User.replaceOne({ avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};

module.exports = { getUsers, getUserById, createUser, updateProfile, updateAvatar};
