import { createAsyncThunk } from "@reduxjs/toolkit";
import data from "../../data/falseData_contact.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const delayTime = 1500;

let contacts = [...data];

//? Función para obtener los contactos
export const getAllThunk = createAsyncThunk("contact/getAll", async () => {
  await delay(delayTime);
  return [...contacts];
});

//? Función para archivar un contacto
export const archiveContact = createAsyncThunk(
  "contact/archive",
  async (id) => {
    await delay(delayTime);

    //? Encuentra el contacto por ID y cambia su estado a 'archived'
    const index = contacts.findIndex(
      (contact) => contact.map((contact) => {
        if(contact.guest_idReview === 1) {
          return {
            ...contact,
            guest_statusReview: "archived" //? Cambia el estado a archived
          };
        }
        return contact; // Retorna el contacto sin cambios
  }));

    contacts = updatedContacts;  // Actualiza la lista de contactos
    return updatedContacts; // Devuelve la lista actualizada de contactos
  }
);
