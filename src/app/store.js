import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../features/bookings/bookingSlice";
import roomsReducer from "../features/rooms/roomsSlice";

const store = configureStore({
  reducer: {
    booking: bookingReducer,
    rooms: roomsReducer,
  }
});

export default store;