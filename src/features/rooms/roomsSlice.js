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
  status: promiseStatus.IDLE,
  error: null,
};

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
