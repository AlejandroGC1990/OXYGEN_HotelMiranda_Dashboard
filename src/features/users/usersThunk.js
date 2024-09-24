import { createAsyncThunk } from "@reduxjs/toolkit";
import usersData from "../../data/falseData_users.json";

export const fetchUserss = createAsyncThunk("users/fetchUsers", async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500)); 
    return usersData;
  });