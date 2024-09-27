import { createSlice } from "@reduxjs/toolkit";
import { fetchRooms } from "../../features/rooms/roomsThunk";
import {
  changeStatus,
  pending,
  promiseStatus,
  rejected,
} from "../../utils/promises";

const initialState = {
  rooms: [],
  filteredRooms: [], 
  status: promiseStatus.IDLE,
  error: null,
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    filterRoomsByStatus: (state, action) => {
      const status = action.payload;
      state.filteredRooms = state.rooms.filter(
        (room) => room.status === status || status === "All"
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        pending(state);
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        changeStatus(state, promiseStatus.FULFILLED);
        state.rooms = action.payload;
        state.filteredRooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        rejected(state, action);
      });
  },
});

export const { filterRoomsByStatus } = roomsSlice.actions;
export default roomsSlice.reducer;
