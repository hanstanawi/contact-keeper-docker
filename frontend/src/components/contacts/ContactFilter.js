import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contacts/contactContext';

const ContactFilter = () => {
  const { filterContact, clearFilter, filteredContacts } = useContext(
    ContactContext
  );
  const text = useRef('');

  useEffect(() => {
    if (!filteredContacts) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (!text.current.value || text.current.value !== '') {
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        type='text'
        ref={text}
        placeholder='Filter Contacts'
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
