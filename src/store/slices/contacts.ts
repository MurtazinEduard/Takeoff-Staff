import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Contact = {
  id: number;
  phone: string;
  name: string;
};

export interface IContactSlice {
  contacts: Contact[];
  modal: boolean
}

const getItemsFromLocalStorage = () => {
  const data = localStorage.getItem('contacts');
  const items: Contact[] = data ? JSON.parse(data) : [];
  return {
    contacts: items,
    modal: false
  };
};

const initialState: IContactSlice = getItemsFromLocalStorage();

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action: PayloadAction<number>) => {
      state.contacts = state.contacts.filter(
        (item) => item.id !== action.payload,
      );
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      state.contacts = state.contacts.map(item => item.id === action.payload.id ? action.payload : item)
    },
    handlePopup: (state) => {
      state.modal = !state.modal
    },
  },
  extraReducers: () => {},
});

export const { addContact, deleteContact, editContact, handlePopup } = contactSlice.actions;

export const contactsReducer = contactSlice.reducer;
