// slices/roomsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import roomsData from '../../data/falseData_rooms.json'; 

const initialState = {
  rooms: [],
  status: 'idle',
  error: null,
};

//? Thunk para cargar los datos de Rooms
export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
    await DelayNode(delaytime);
  return roomsData;
});

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default roomsSlice.reducer;
