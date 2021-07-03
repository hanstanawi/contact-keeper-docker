import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contacts/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const {
    addContact,
    currentContact,
    clearCurrent,
    updateContact,
  } = contactContext;
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  useEffect(() => {
    if (currentContact) {
      setContact(currentContact);
    } else {
      clearInput();
    }
  }, [contactContext, currentContact]);

  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!currentContact) {
      addContact(contact);
      clearAll();
      return;
    }
    updateContact(contact);
    clearAll();
  };

  const clearInput = () => {
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {currentContact ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        id='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />
      <label htmlFor='personal' className='mx-1'>
        Personal
      </label>
      <input
        type='radio'
        name='type'
        value='professional'
        id='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />
      <label htmlFor='professional' className='mx-1'>
        Professional
      </label>
      <div>
        <input
          type='submit'
          value={currentContact ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {currentContact && (
        <div>
          <button className='btn btn-danger btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
