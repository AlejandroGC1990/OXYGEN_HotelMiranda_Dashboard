import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRooms } from "../../features/rooms/roomsThunk";
import { changeStatus, pending, promiseStatus, rejected } from "../../utils/promises";

interface RoomState {
  rooms: Room[];
  filteredRooms: Room[];
  status: promiseStatus;
  error: string | null;
}

const initialState: RoomState = {
  rooms: [],
  filteredRooms: [],
  status: promiseStatus.IDLE,
  error: null,
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    filterRoomsByStatus: (state, action: PayloadAction<string>) => {
      const status = action.payload;
      state.filteredRooms = state.rooms.filter(
        (room) => room.room_status === status || status === "All"
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        pending(state);
      })
      .addCase(fetchRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
        changeStatus(state, promiseStatus.FULFILLED);
        state.rooms = action.payload;
        state.filteredRooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action: PayloadAction<any>) => {
        rejected(state, action);
      });
  },
});

export const { filterRoomsByStatus } = roomsSlice.actions;
export default roomsSlice.reducer;
