import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../features/bookings/bookingSlice";
import roomsReducer from "../features/rooms/roomsSlice";
import contactReducer from "../features/contact/contactSlice";

const store = configureStore({
  reducer: {
    booking: bookingReducer,
    rooms: roomsReducer,
    contact: contactReducer,
  }
});

export default store;