import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from '../features/booking/bookingSlice';

const store = configureStore({
  reducer: {
    booking: bookingReducer,
  }
});

export default store;