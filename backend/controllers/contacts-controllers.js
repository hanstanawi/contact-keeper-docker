const User = require('../models/User');
const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');

/**
 * @route   GET api/contacts
 * @desc    Get Contacts
 * @access  Private
 */
exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * @route   GET api/contacts/:id
 * @desc    Get Contact
 * @access  Private
 */
exports.getContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ msg: 'Contact does not exist' });
    }
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    res.status(200).json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * @route   POST api/contacts
 * @desc    Add new contact
 * @access  Private
 */
exports.addContact = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, phone, type } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user.id,
    });
    const contact = await newContact.save();
    res.status(201).json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * @route   PUT api/contacts/:id
 * @desc    Update a contact
 * @access  Private
 */
exports.updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, type } = req.body;
  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;
  try {
    let contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ msg: 'Contact does not exist' });
    }
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    contact = await Contact.findByIdAndUpdate(
      id,
      { $set: contactFields },
      { new: true }
    );
    res.status(200).json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * @route   DELETE api/contacts/:id
 * @desc    Delete a contact
 * @access  Private
 */
exports.deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    let contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ msg: 'Contact does not exist' });
    }
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await Contact.findByIdAndRemove(id);
    res.status(200).json({ msg: 'Contact Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
