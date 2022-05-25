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
       res.status(500).send({ message: 'An error has occurred on the server' });})
}


const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
   await User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));
};

const updateProfile = async (req, res) => {
  const { name, about } = req.body;
   await User.findByIdAndUpdate(req.user._id, { name, about })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));
};

const updateAvatar = async (req, res) => {
  const { avatar } = req.body;
   await User.findByIdAndUpdate(req.user._id, { avatar: avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));
};

module.exports = { getUsers, getUserById, createUser, updateProfile, updateAvatar};
