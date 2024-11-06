import { useSelector } from 'react-redux';

import Contact from '../Contact/Contact.jsx';

import { selectFilterListContacts } from '../../redux/filtersSlice.js';

import css from './ContactList.module.css';

const ContactList = () => {
  const filterContacts = useSelector(selectFilterListContacts);

  return (
    <ul className={css.listContacts}>
      {filterContacts.map(contact => {
        return (
          <li className={css.listItemContacts} key={contact.id}>
            <Contact
              name={contact.name}
              number={contact.number}
              id={contact.id}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
