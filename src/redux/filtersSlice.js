import { createSelector, createSlice } from '@reduxjs/toolkit';

import { selectContacts } from './contactsSlice.js';

const initialState = {
  filters: {
    name: '',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filters.name = action.payload;
    },
  },
  selectors: {
    selectNameFilter: state => state.filters.name,
  },
});

export default filterSlice.reducer;
export const { changeFilter } = filterSlice.actions;
export const { selectNameFilter } = filterSlice.selectors;
//
export const selectFilterListContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filters) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filters.toLowerCase().trim())
    );
  }
);
