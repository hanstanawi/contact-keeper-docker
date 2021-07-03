const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controllers');
const { check } = require('express-validator');

router.post(
  '/',
  [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  usersController.registerUser
);

module.exports = router;
