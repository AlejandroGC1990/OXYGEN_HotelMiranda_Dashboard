import { createAsyncThunk } from "@reduxjs/toolkit";
// import usersData from "../../data/falseData_users.json";
import usersData from "../../data/falseData_users.json";
console.log("Datos de usuarios desde JSON:", usersData);

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500)); 
  console.log("Datos de usuarios:", usersData);
  return usersData;
});