import { createSlice } from "@reduxjs/toolkit";
import { fetchUserss } from "../../features/users/usersThunk";
import {
  changeStatus,
  pending,
  promiseStatus,
  rejected,
} from "../../utils/promises";

const initialState = {
  users: [],
  filteredUsers: [],
  status: promiseStatus.IDLE,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchUserss.pending, (state) => {
      pending(state);
    })
    .addCase(fetchUserss.fulfilled, (state, action) => {
      changeStatus(state, promiseStatus.FULFILLED);
      state.users = action.payload;
    })
    .addCase(fetchUserss.rejected, (state, action) => {
      rejected(state, action);
    });
  },
});

export default usersSlice.reducer;
