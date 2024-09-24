import { createAsyncThunk } from "@reduxjs/toolkit";
import data from "../../data/falseData_contact.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve,ms));
const delayTime = 1500;

//? Función para obtener los contactos
export const getAllThunk = createAsyncThunk("contact/getAll", async () => {
    await delay(delayTime);
    return data;
});
