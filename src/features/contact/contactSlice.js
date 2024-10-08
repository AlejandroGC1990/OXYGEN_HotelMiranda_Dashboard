import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, archiveContact } from "./contactThunk";
import {
  changeStatus,
  pending,
  promiseStatus,
  rejected,
} from "../../utils/promises";

const initialState = {
  contacts: [],
  filteredContacts: [], 
  status: promiseStatus.IDLE,
  error: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    filterContactsByStatus: (state, action) => {
      const status = action.payload;
      state.filteredContacts = state.contacts.filter((contact) =>
        contact.status === status || status === "All"
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        pending(state);
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        changeStatus(state, promiseStatus.FULFILLED);
        state.contacts = action.payload;
        state.filteredContacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        rejected(state, action);
      })
      .addCase(archiveContact.fulfilled, (state, action) => {
        state.contacts = action.payload; //? Actualiza la lista de contactos
      });
  },
});

export const { filteredContacts, filterContactsByStatus  } = contactSlice.actions;
export default contactSlice.reducer;
