import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';

import { MdContactPhone } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [themeTitle, setThemeTitle] = useLocalStorage('theme', 'light');
  const [filteredName, setFilteredName] = useState('');

  const switchTheme = () => {
    setThemeTitle(prevState => (prevState === 'light' ? 'dark' : 'light'));
  };

  const addContact = ({ name, number }) => {
    if (contacts.some(c => c.name === name)) {
      toast.error(`Contact ${name} already exists!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
    if (contacts.some(c => c.number === number)) {
      toast.error(`Contact ${number} already exists!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
    setContacts(prevState => [{ id: nanoid(4), name, number }, ...prevState]);
  };

  const deleteContact = contactId => {
    const newContacts = contacts.filter(c => c.id !== contactId);
    setContacts(newContacts);
  };

  const handleFilter = event => {
    setFilteredName(event.target.value);
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

          <ThemeSwitcher switchTheme={switchTheme} themeTitle={themeTitle} />
        </Box>
        <Container>
          <Form addContact={addContact} />
          <Section title="Contacts">
            {contacts.length > 0 ? (
              <Contacts
                contacts={getFilteredContacts()}
                deleteContact={deleteContact}
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
