import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        booking: [],
    },
    reducers: {
        setBooking: (state, action) => {
            state.booking = action.payload;
        },
        addBooking: (state, action) => {
            state.booking.push(action.payload);
        },
        removeBooking: (state, action) => {
            state.booking = state.booking.filter(booking => booking.id !== action.payload);
        },
        updateBooking: (state, action) => {
            const index = state.booking.findIndex(booking => booking.id === action.payload.id);
            if(index !== -1) {
                state.booking[index] = action.payload;
            }
        },
    },
});

export const {setBooking, addBooking, removeBooking, updateBooking} = bookingSlice.actions;
export default bookingSlice.reducer;