import { createSlice } from "@reduxjs/toolkit";
import { getAllThunk } from "./contactThunk";
import {
  changeStatus,
  pending,
  promiseStatus,
  rejected,
} from "../../utils/promises";

const initialState = {
  contacts: [],
  contact: null,
  status: promiseStatus.IDLE,
  error: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    archiveContact: (state, action) => {
      const id = action.payload;
      state.contacts = state.contacts.map((contact) =>
        contact.id === id
          ? { ...contact, guest_statusReview: "archived" }
          : contact
      );
    },
  },
  extraReducers: (builder) => {
    builder
      //? Obtener todos los contactos
      .addCase(getAllThunk.pending, (state) => {
        pending(state);
      })
      .addCase(getAllThunk.fulfilled, (state, action) => {
        changeStatus(state, promiseStatus.FULFILLED);
        state.contacts = action.payload;
      })
      .addCase(getAllThunk.rejected, (state, action) => {
        rejected(state, action);
      });
  },
});

export const { archiveContact } = contactSlice.actions;
export const selectContacts = (state) => state.contact.contacts; //?selector para obtener los contactos
export default contactSlice.reducer;
