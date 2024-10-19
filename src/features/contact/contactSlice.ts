import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchContacts,
  fetchContactById,
  addContact,
  updateContact,
  deleteContact,
  archiveContact,
  publishContact
} from "./contactThunk";
import {
  promiseStatus,
} from "../../utils/promises";
import { Contact } from '../../interfaces/contact';

//? Estado inicial para el slice de contactos
export interface ContactState {
  pending: boolean;
  contacts: Contact[];               //? Lista de todos los contactos
  selectedContact: Contact | null;    //? Contacto seleccionado para ver detalles
  filteredContacts: Contact[];       //? Contactos filtrados por estado
  status: promiseStatus;             //? Estado de la promesa (IDLE, PENDING, FULFILLED, REJECTED)
  error: string | null;              //? Mensaje de error, si existe
}

const initialState: ContactState = {
  contacts: [],
  selectedContact: null,
  filteredContacts: [],
  status: promiseStatus.IDLE,
  error: null,
  pending: false,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    //? Reducer para filtrar contactos por estado
    filterContactsByStatus: (state, action: PayloadAction<string>) => {
      const status = action.payload;
      state.filteredContacts = state.contacts.filter((contact) =>
        contact.guest_statusReview === status || status === "All"
      );
    },
  },
  extraReducers: (builder) => {
    builder
      //? Manejo de la acción para obtener todos los contactos
      .addCase(fetchContacts.pending, (state) => {
        state.status = promiseStatus.PENDING;
        // state.error = null;
        state.pending = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
        state.status = promiseStatus.FULFILLED;
        state.contacts = action.payload; //? Actualizar la lista de contactos
        state.filteredContacts = action.payload; //? Actualizar los contactos filtrados
        state.pending = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = promiseStatus.REJECTED;
        state.error = action.error.message || null; //? Capturar el mensaje de error
        state.pending = false;
      })
      //? Manejo de la acción para obtener un contacto por ID
      .addCase(fetchContactById.fulfilled, (state, action: PayloadAction<Contact>) => {
        state.selectedContact = action.payload; //? Actualizar el contacto seleccionado
      })
      //? Manejo de la acción para añadir un nuevo contacto
      .addCase(addContact.fulfilled, (state, action: PayloadAction<Contact>) => {
        state.contacts.push(action.payload); //? Añadir el nuevo contacto a la lista
        state.filteredContacts.push(action.payload); //? Añadir también a los contactos filtrados
      })
      //? Manejo de la acción para actualizar un contacto existente
      .addCase(updateContact.fulfilled, (state, action: PayloadAction<Contact>) => {
        const index = state.contacts.findIndex(
          contact => contact.guest_idReview === action.payload.guest_idReview
        );
        if (index !== -1) {
          state.contacts[index] = action.payload; //? Actualizar el contacto en la lista
          //? Actualizar filteredContacts
          const filteredIndex = state.filteredContacts.findIndex(
            contact => contact.guest_idReview === action.payload.guest_idReview
          );
          if (filteredIndex !== -1) {
            state.filteredContacts[filteredIndex] = action.payload; //? Actualizar en la lista filtrada si existe
          }
        }
      })
      //? Manejo de la acción para eliminar un contacto
      .addCase(deleteContact.fulfilled, (state, action: PayloadAction<number>) => {
        state.contacts = state.contacts.filter(contact => contact.guest_idReview !== action.payload); //? Filtrar el contacto eliminado
        state.filteredContacts = state.filteredContacts.filter(contact => contact.guest_idReview !== action.payload); //? También filtrar de los contactos filtrados
      })
      //?Para cambiar el estado de guest_statusReview
      .addCase(archiveContact.fulfilled, (state, action) => {
        const { guest_idReview } = action.payload;
        const contact = state.contacts.find(contact => contact.guest_idReview === guest_idReview);
        if (contact) {
          contact.guest_statusReview = 'archived';
        }
      })
      .addCase(publishContact.fulfilled, (state, action) => {
        const { guest_idReview } = action.payload;
        const contact = state.contacts.find(contact => contact.guest_idReview === guest_idReview);
        if (contact) {
          contact.guest_statusReview = 'publish';
        }
      });
  },
});

//? Exportar las acciones y el reducer
export const { filterContactsByStatus } = contactSlice.actions;
export default contactSlice.reducer;