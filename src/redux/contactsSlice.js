import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialContactsState = {
  contacts: [],
  filteredName: '',
};

const initialGlobalState = {
  themeTitle: 'light',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContactsState,
  reducers: {
    addContact: {
      prepare: newContact => {
        return { payload: { ...newContact, id: nanoid(6) } };
      },
      reducer: (state, { payload }) => {
        state.contacts = [payload, ...state.contacts];
      },
    },
    deleteContact(state, { payload }) {
      state.contacts = state.contacts.filter(c => c.id !== payload);
    },
    setFilteredName(state, { payload }) {
      state.filteredName = payload;
    },
  },
});

const globalSlice = createSlice({
  name: 'theme',
  initialState: initialGlobalState,
  reducers: {
    toggleThemeTitle(state) {
      state.themeTitle = state.themeTitle === 'light' ? 'dark' : 'light';
    },
  },
});

export const { addContact, deleteContact, setFilteredName } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

export const { toggleThemeTitle } = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
