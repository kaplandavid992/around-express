const {
  validationError,
  defaultError,
  errorsHandle,
} = require('../utils/errorHandling');
const User = require('../models/user');

const options = { runValidators: true, new: true };

const getUsers = async (req, res) => {
  try {
    await User.find({})
      .orFail(() => {
        const error = new Error('No users found');
        error.statusCode = 404;
      })
      .then((users) => res.send(users));
  } catch (error) {
    defaultError(res);
  }
};

const getUserById = async (req, res) => {
  await User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error('user id not found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => errorsHandle(err, res, 'User'));
};

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  await User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      validationError(err, res);
    });
};

const updateProfile = async (req, res) => {
  const { name, about } = req.body;
  await User.findByIdAndUpdate(req.user._id, { name, about }, options)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      validationError(err, res);
    });
};

const updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  await User.findByIdAndUpdate(req.user._id, { avatar }, options)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      validationError(err, res);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
