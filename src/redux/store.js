import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { contactsReducer } from './contactsSlice';
import { globalReducer } from './contactsSlice';

// const persistedContactsReducer = persistReducer(
//   { key: 'contacts', storage, whitelist: ['contacts', 'themeTitle'] },
//   contactsReducer
// );

const persistedContactsReducer = persistReducer(
  { key: 'contacts', storage },
  contactsReducer
);

const persistedThemeReducer = persistReducer(
  { key: 'theme', storage },
  globalReducer
);

const rootReducer = combineReducers({
  contacts: persistedContactsReducer,
  theme: persistedThemeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
