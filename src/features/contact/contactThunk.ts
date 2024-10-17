import { createAsyncThunk } from "@reduxjs/toolkit";

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

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
const delayTime = 1500;

//? Función para obtener todos los contactos
export const fetchContacts = createAsyncThunk("contact/getAll", async () => {
  await delay(delayTime);
  const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`);
  
  if (!response.ok) {
    throw new Error('Error al obtener los contactos');
  }
  
  const data: Contact[] = await response.json();
  return data; 
});

//? Función para obtener un contacto por ID
export const fetchContactById = createAsyncThunk("contact/getById", async (id: number) => {
  await delay(delayTime);
  const response = await fetch(`${import.meta.env.VITE_API_URL}/contact/${id}`);
  
  if (!response.ok) {
    throw new Error('Error al obtener el contacto');
  }
  
  const contact: Contact = await response.json();
  return contact; 
});

//? Función para añadir un nuevo contacto
export const addContact = createAsyncThunk("contact/add", async (newContact: Contact) => {
  await delay(delayTime);
  const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
    method: 'POST',
    body: JSON.stringify(newContact),
    headers: { 'Content-Type': 'application/json' },
  });
  
  if (!response.ok) {
    throw new Error('Error al añadir el contacto');
  }
  
  const contact: Contact = await response.json();
  return contact; 
});

//? Función para actualizar un contacto existente
export const updateContact = createAsyncThunk(
  "contact/update",
  async (updatedContact: Contact) => {
    await delay(delayTime);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/contact/${updatedContact.guest_idReview}`, {
      method: 'PUT', 
      body: JSON.stringify(updatedContact),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) {
      throw new Error('Error al actualizar el contacto');
    }
    
    const contact: Contact = await response.json();
    return contact; 
  }
);

//? Función para eliminar un contacto
export const deleteContact = createAsyncThunk("contact/delete", async (id: number) => {
  await delay(delayTime);
  const response = await fetch(`${import.meta.env.VITE_API_URL}/contact/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el contacto');
  }

  return id; 
});