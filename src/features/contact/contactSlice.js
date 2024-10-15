import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts } from "./contactThunk";
// import { fetchContacts, archiveContact } from "./contactThunk";
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
        // pending(state);
        state.status = promiseStatus.LOADING;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        // changeStatus(state, promiseStatus.FULFILLED);
        state.status = promiseStatus.FULFILLED;
        state.contacts = action.payload;
        state.filteredContacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        // rejected(state, action);
        state.status = promiseStatus.FAILED;
        state.error = action.error.message;
      })
      // .addCase(archiveContact.fulfilled, (state, action) => {
      //   state.contacts = action.payload; //? Actualiza la lista de contactos
      // });
  },
});

export const { filteredContacts, filterContactsByStatus  } = contactSlice.actions;
export default contactSlice.reducer;
