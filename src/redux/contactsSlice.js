import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './contactsOps';

const initialState = {
  contacts: {
    items: [],
    loading: false,
    error: null,
  },
};

const handlePending = state => {
  state.contacts.loading = true;
};

const handleRejected = (state, action) => {
  state.contacts.loading = false;
  state.contacts.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = null;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = null;
        state.contacts.items.push(action.payload);
        console.log(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)

      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = null;
        const index = state.contacts.items.findIndex(
          task => task.id === action.payload.id
        );
        state.contacts.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
  selectors: {
    selectContacts: state => state.contacts.items,
    selectLoading: state => state.contacts.loading,
    selectError: state => state.contacts.error,
  },
});

export default contactsSlice.reducer;
export const { selectContacts, selectLoading, selectError } =
  contactsSlice.selectors;
