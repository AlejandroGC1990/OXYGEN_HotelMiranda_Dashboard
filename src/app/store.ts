import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "../features/contact/contactSlice";
import { useDispatch } from "react-redux";
// import bookingReducer from "../features/bookings/bookingSlice";
// import roomsReducer from "../features/rooms/roomsSlice";
// import usersReducer from "../features/users/usersSlice";


export const store = configureStore({
  reducer: {
    contact: contactReducer,
    // booking: bookingReducer,
    // rooms: roomsReducer,
    // users: usersReducer,
  }
});


export type RootState = ReturnType<typeof store.getState>; //? Tipo RootState: esto define el tipo del estado global
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();