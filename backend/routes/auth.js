const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controllers');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');

router.get('/', auth, authController.getUser);

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  authController.login
);

module.exports = router;
