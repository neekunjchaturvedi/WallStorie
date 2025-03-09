import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  userinfo: [],
  allUsers: [], // Initialize allUsers as an empty array
  status: "idle",
  error: null,
};

// Async thunk for fetching all user info
export const fetchUserinfo = createAsyncThunk(
  "userinfo/fetchUserinfo",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_PORT}/api/info/userinfo`
    );
    return response.data;
  }
);

// Async thunk for creating new user info
export const addUserinfo = createAsyncThunk(
  "userinfo/addUserinfo",
  async (newUserinfo) => {
    const response = await axios.post(
      `${import.meta.env.VITE_PORT}/api/info/userinfopost`,
      newUserinfo
    );
    return response.data;
  }
);

// Async thunk for fetching all registered users
export const fetchAllUsers = createAsyncThunk(
  "userinfo/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_PORT}/api/info/getusers`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error in API call:", err.response?.data);
      return rejectWithValue(err.response?.data || "Failed to fetch users");
    }
  }
);

// Create the slice
const userinfoSlice = createSlice({
  name: "userinfo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserinfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserinfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userinfo = action.payload;
      })
      .addCase(fetchUserinfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addUserinfo.fulfilled, (state, action) => {
        state.userinfo.push(action.payload);
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allUsers = Array.isArray(action.payload.users)
          ? action.payload.users
          : []; // Ensure the payload is an array
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userinfoSlice.reducer;
