import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  CLEAR_CONTACTS,
  FILTER_CONTACTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
} from '../types';

const contactReducer = (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false,
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          return contact._id === action.payload._id ? action.payload : contact;
        }),
        loading: false,
      };
    case DELETE_CONTACT:
      const filteredContacts = state.contacts.filter(
        (contact) => contact._id !== action.payload
      );
      return {
        ...state,
        contacts: filteredContacts,
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        currentContact: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        currentContact: null,
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filteredContacts: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filteredContacts: null,
      };
    case CONTACT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        currentContact: null,
        filteredContacts: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default contactReducer;
