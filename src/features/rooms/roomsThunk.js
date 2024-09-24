import { createAsyncThunk } from "@reduxjs/toolkit";
import roomsData from "../../data/falseData_rooms.json";

//? Thunk para cargar los datos de Rooms
export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500)); 
    return roomsData;
  });