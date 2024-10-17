import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchContacts, fetchContactById, addContact, updateContact, deleteContact } from "./contactThunk";
import {
  promiseStatus,
} from "../../utils/promises";

export interface Contact {
  guest_idReview: number;           
  guest_timeDateReview: string;     
  guest_DateReview: string;          
  guest_name: string;                
  guest_email: string;               
  guest_phone: string;              
  guest_rateReview: number;     
  guest_commentReview: string;    
  guest_statusReview: string;      
  guest_checkIn: string;       
  guest_checkInTime: string;    
  guest_checkOut: string;           
  guest_checkOutTime: string;        
  guest_orderDateTime: string;      
  guest_orderDate: string;                  
  guest_room_state: string;         
}

//? Estado inicial para el slice de contactos
interface ContactState {
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
      })
      .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
        state.status = promiseStatus.FULFILLED; 
        state.contacts = action.payload; //? Actualizar la lista de contactos
        state.filteredContacts = action.payload; //? Actualizar los contactos filtrados
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = promiseStatus.REJECTED; 
        state.error = action.error.message || null; //? Capturar el mensaje de error
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
        const index = state.contacts.findIndex(contact => contact.guest_idReview === action.payload.guest_idReview);
        if (index !== -1) {
          state.contacts[index] = action.payload; //? Actualizar el contacto en la lista
        }
      })
      //? Manejo de la acción para eliminar un contacto
      .addCase(deleteContact.fulfilled, (state, action: PayloadAction<number>) => {
        state.contacts = state.contacts.filter(contact => contact.guest_idReview !== action.payload); //? Filtrar el contacto eliminado
        state.filteredContacts = state.filteredContacts.filter(contact => contact.guest_idReview !== action.payload); //? También filtrar de los contactos filtrados
      });
  },
});

//? Exportar las acciones y el reducer
export const { filterContactsByStatus } = contactSlice.actions;
export default contactSlice.reducer;
