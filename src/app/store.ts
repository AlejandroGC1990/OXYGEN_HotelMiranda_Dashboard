import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "../features/contact/contactSlice";
// import bookingReducer from "../features/bookings/bookingSlice";
// import roomsReducer from "../features/rooms/roomsSlice";
// import usersReducer from "../features/users/usersSlice";

export interface RootState {
  contact: ReturnType<typeof contactReducer>;
}

const store = configureStore({
  reducer: {
    contact: contactReducer,
    // booking: bookingReducer,
    // rooms: roomsReducer,
    // users: usersReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export default store;