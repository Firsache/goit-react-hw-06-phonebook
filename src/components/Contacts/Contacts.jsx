import PropTypes from 'prop-types';

import { List, Item, Text } from './Contacts.styled';
import { Button } from 'components/Form/Form.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectFilteredName } from 'redux/contacts/selectors';
import { deleteContact } from 'redux/contacts/contactsSlice';

export function Contacts({ children }) {
  const contacts = useSelector(selectContacts);
  const filteredName = useSelector(selectFilteredName);
  const dispatch = useDispatch();

  const deleteSelectedContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const getFilteredContacts = (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts(contacts, filteredName);

  return (
    <>
      {children}
      <List>
        {filteredContacts.map(({ id, name, number }) => (
          <Item key={id}>
            <Text>
              {name}: <span>{number}</span>
            </Text>
            <Button
              onClick={() => {
                deleteSelectedContact(id);
              }}
            >
              Delete
            </Button>
          </Item>
        ))}
      </List>
    </>
  );
}

Contacts.propTypes = {
  children: PropTypes.node,
};
