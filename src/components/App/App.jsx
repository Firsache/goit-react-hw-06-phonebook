// import { nanoid } from 'nanoid';
// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useLocalStorage } from 'hooks/useLocalStorage';

import { MdContactPhone } from 'react-icons/md';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { deleteContact, setFilteredName } from 'redux/contactsSlice';

import { toggleThemeTitle } from 'redux/contactsSlice';
import {
  selectContacts,
  selectFilteredName,
  selectThemeTitle,
} from 'redux/selectors';

import { Container, Title } from './App.styled';
import { GlobalStyles } from 'styles/GlobalStyles/globalStyles.styled';
import { colors } from 'styles/colors';
import { theme } from '../../styles/theme';
import {
  Layout,
  Contacts,
  Form,
  Filter,
  Section,
  Notification,
  ThemeSwitcher,
  Box,
} from '../index';

export function App() {
  const contacts = useSelector(selectContacts);
  const filteredName = useSelector(selectFilteredName);
  const themeTitle = useSelector(selectThemeTitle);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(toggleThemeTitle());
  };

  const deleteSelectedContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const handleFilter = event => {
    dispatch(setFilteredName(event.target.value));
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filteredName.toLowerCase())
    );
  };
  const normalizedTheme = { ...theme, ...colors[themeTitle] };

  return (
    <Layout theme={normalizedTheme}>
      <Box as="section">
        <Box
          position="relative"
          py={4}
          bg={normalizedTheme.colors.accent}
          as="div"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={normalizedTheme.colors.white}
            as="div"
          >
            <MdContactPhone size={35} />
            <Title>Phonebook</Title>
          </Box>

          <ThemeSwitcher switchTheme={toggleTheme} themeTitle={themeTitle} />
        </Box>
        <Container>
          <Form />
          <Section title="Contacts">
            {contacts.length > 0 ? (
              <Contacts
                contacts={getFilteredContacts()}
                deleteContact={deleteSelectedContact}
              >
                {contacts.length > 1 ? (
                  <Filter value={filteredName} filterChange={handleFilter} />
                ) : (
                  ''
                )}
              </Contacts>
            ) : (
              <Notification message="There are no contacts in the phonebook yet..." />
            )}
          </Section>
          <ToastContainer autoClose={3000} />
          <GlobalStyles />
        </Container>
      </Box>
    </Layout>
  );
}
