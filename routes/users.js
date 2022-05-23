const router = require('express').Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.post('/users', createUser);

module.exports = router;


//PATCH /users/me — update profile
//PATCH /users/me/avatar — update avatar
//  get the id from req.user._id