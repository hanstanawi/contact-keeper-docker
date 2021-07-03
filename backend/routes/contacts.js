const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts-controllers');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');

router.get('/', auth, contactsController.getContacts);

router.get('/:id', auth, contactsController.getContact);

router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  contactsController.addContact
);

router.put('/:id', auth, contactsController.updateContact);

router.delete('/:id', auth, contactsController.deleteContact);

module.exports = router;
