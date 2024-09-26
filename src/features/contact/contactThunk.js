import { createAsyncThunk } from "@reduxjs/toolkit";
import data from "../../data/falseData_contact.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const delayTime = 1500;

let contacts = [...data];

//? Función para obtener los contactos
export const fetchContacts = createAsyncThunk("contact/getAll", async () => {
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
      (contact) => contact.guest_idReview === id
    );
    if (index !== -1) {
      contacts[index] = {
        ...contacts[index],
        guest_statusReview: "archived", //? Cambia el estado a archived
      };
    }

    return [...contacts]; //? Devuelve la lista actualizada de contactos
  }
);
