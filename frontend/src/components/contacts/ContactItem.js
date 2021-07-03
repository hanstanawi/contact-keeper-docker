import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contacts/contactContext';

const ContactItem = ({ contact }) => {
  const { deleteContact, setCurrent, clearCurrent } = useContext(
    ContactContext
  );
  const { _id, name, email, phone, type } = contact;

  const typeName = `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-white'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={`badge ${
            type === 'professional' ? 'badge-success' : 'badge-primary'
          }`}
        >
          {typeName}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open mr-1'></i>
            {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone mr-1'></i>
            {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
