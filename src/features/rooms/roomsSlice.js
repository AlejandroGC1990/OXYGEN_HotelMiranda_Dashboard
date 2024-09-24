// slices/roomsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import roomsData from "../../data/falseData_rooms.json";
import {
  changeStatus,
  pending,
  promiseStatus,
  rejected,
} from "../../utils/promises";

const initialState = {
  rooms: [],
  status: promiseStatus.IDLE,
  error: null,
};

//? Thunk para cargar los datos de Rooms
export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulación de delay
  return roomsData;
});

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        pending(state);
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        changeStatus(state, promiseStatus.FULFILLED);
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        rejected(state, action);
      });
  },
});

export default roomsSlice.reducer;
