import { createAsyncThunk } from "@reduxjs/toolkit";
import roomsData from "../../data/falseData_rooms.json";

//? Definir la estructura de cada habitación
interface Room {
  room_id: number;
  room_number: number;
  room_type: string;
  room_facilities: string[];
  room_price: number;
  offer_price?: number;
  room_status: string;
  room_picture: string;
  room_bedType: string;
}

//? Definir la estructura del array de rooms
type RoomsData = Room[];

//? Thunk para cargar los datos de Rooms con tipos explícitos
export const fetchRooms = createAsyncThunk<RoomsData>("rooms/fetchRooms", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log("Datos de rooms:", roomsData);
  return roomsData as RoomsData;
});
