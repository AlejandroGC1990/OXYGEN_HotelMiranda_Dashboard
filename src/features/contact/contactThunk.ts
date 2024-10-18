import { createAsyncThunk } from "@reduxjs/toolkit";
import { Contact } from '../../interfaces/contact';

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
const delayTime = 1500;

//? Función auxiliar para realizar fetch con manejo de errores
const fetchWithDelay = async (url: string, options?: RequestInit): Promise<any> => {
  await delay(delayTime);
  const response = await fetch(url, { ...options, credentials: 'include' });

  // Verifica si la respuesta es exitosa
  const contentType = response.headers.get('Content-Type');
  // Log de la respuesta completa
  const responseData = await response.text(); //? Lee la respuesta como texto

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error en la solicitud: ${errorText}`);
  }

  // Si el contenido es JSON, devuelve los datos parseados
  if (contentType && contentType.includes('application/json')) {
    return JSON.parse(responseData); // Parseamos el texto como JSON si es necesario
  }

  return response;
};

//? Función para obtener todos los contactos
export const fetchContacts = createAsyncThunk<Contact[], string>(
  'contact/fetchContacts',
  async (token, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/contact/`;
      const headers = { Authorization: `Bearer ${token}` };
      return await fetchWithDelay(url, { headers });
    } catch (error: any) {
      console.error('Error fetching contacts:', error);
      return rejectWithValue(error.message);
    }
  }
);

//? Función para obtener un contacto por ID
export const fetchContactById = createAsyncThunk<Contact, { id: number; token: string }>(
  "contact/getById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/contact/${id}`;
      const headers = { Authorization: `Bearer ${token}` };
      return await fetchWithDelay(url, { headers });
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

//? Función para añadir un nuevo contacto
export const addContact = createAsyncThunk<Contact, { newContact: Contact; token: string }>(
  "contact/add",
  async ({ newContact, token }, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/contact`;
      const options = {
        method: 'POST',
        body: JSON.stringify(newContact),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      };
      return await fetchWithDelay(url, options);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

//? Función para actualizar un contacto existente
export const updateContact = createAsyncThunk<Contact, { updatedContact: Contact; token: string }>(
  "contact/update",
  async ({ updatedContact, token }, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/contact/${updatedContact.guest_idReview}`;
      const options = {
        method: 'PUT',
        body: JSON.stringify(updatedContact),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      };
      return await fetchWithDelay(url, options);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

//? Función para eliminar un contacto
export const deleteContact = createAsyncThunk<number, { id: number; token: string }>(
  "contact/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/contact/${id}`;
      const options = {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      };
      await fetchWithDelay(url, options);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


//? Función para archivar un contacto
export const archiveContact = createAsyncThunk<Contact, { id: number; token: string }>(
  "contact/archive",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/contact/${id}`;
      const options = {
        method: 'PATCH',
        body: JSON.stringify({ guest_status: 'archived' }), // Solo actualizar el estado
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      };
      return await fetchWithDelay(url, options);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

//? Función para publicar un contacto
export const publishContact = createAsyncThunk<Contact, { id: number; token: string }>(
  "contact/publish",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/contact/${id}`;
      const options = {
        method: 'PATCH', 
        body: JSON.stringify({ guest_status: 'published' }), // Solo actualizar el estado
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      };
      return await fetchWithDelay(url, options);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
