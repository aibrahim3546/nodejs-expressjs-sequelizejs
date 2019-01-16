const express = require('express');

const router = express.Router();
const { authController } = require('../controllers');
const { jwtMiddleware } = require('../middlewares');


const {
  getUser,
  registerUser,
  loginUser,
  updateUser,
} = authController;

/* GET USER PROFILE */
router.get('/profile/:username', jwtMiddleware, getUser);

/* REGISTER USER */
router.post('/register', registerUser);

/* LOGIN USER */
router.post('/login', loginUser);

/* UPDATE USER */
router.patch('/profile/:username', jwtMiddleware, updateUser);

module.exports = router;
