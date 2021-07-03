import React, { useContext, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contacts/contactContext';
import Spinner from '../layout/Spinner';

const Contacts = () => {
  const { contacts, filteredContacts, loading } = useContext(
    ContactContext
  );

  const items = filteredContacts ? filteredContacts : contacts;

  if (contacts && !contacts.length && !loading) {
    return <h4>Please Add a Contact</h4>;
  }

  return (
    <Fragment>
      {contacts && !loading ? (
        <TransitionGroup>
          {items.map((contact) => (
            <CSSTransition key={contact._id} timeout={500} classNames='item'>
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
