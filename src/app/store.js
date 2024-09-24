import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../features/bookings/bookingSlice";
import roomsReducer from "../features/rooms/roomsSlice";
import contactReducer from "../features/contact/contactSlice";
import usersReducer from "../features/users/usersSlice";

const store = configureStore({
  reducer: {
    booking: bookingReducer,
    rooms: roomsReducer,
    contact: contactReducer,
    users: usersReducer,
  }
});

export default store;