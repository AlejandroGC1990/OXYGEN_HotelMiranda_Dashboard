import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../../features/users/usersThunk";
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
  reducers: {
    filterUsersByStatus: (state, action) => {
      const status = action.payload;
      state.filteredUsers = state.users.filter(
        (user) => user.status === status || status === "All"
      );
    },
    // searchUserByName: (state, action) => {
    //   const searchText = action.payload.toLowerCase();
    //   state.filteredUsers = state.users.filter((user) =>
    //     user.name.toLowerCase().includes(searchText)
    //   );
    // },
    // sortUsersByColumn: (state, action) => {
    //   const { column, direction } = action.payload;
    //   state.filteredUsers = [...state.filteredUsers].sort((a, b) => {
    //     if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
    //     if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
    //     return 0;
    //   });
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        pending(state);
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        changeStatus(state, promiseStatus.FULFILLED);
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        rejected(state, action);
      });
  },
});

export const { filterUsersByStatus /*, searchUserByName, sortUsersByColumn*/ } =
  usersSlice.actions;
export default usersSlice.reducer;
