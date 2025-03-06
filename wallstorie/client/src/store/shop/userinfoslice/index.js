import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  userinfo: [],
  status: "idle",
  error: null,
};

// Async thunk for fetching all user info
export const fetchUserinfo = createAsyncThunk(
  "userinfo/fetchUserinfo",
  async () => {
    const response = await axios.get("http://localhost:5000/api/info/userinfo");
    return response.data;
  }
);

// Async thunk for creating new user info
export const addUserinfo = createAsyncThunk(
  "userinfo/addUserinfo",
  async (newUserinfo) => {
    const response = await axios.post(
      "http://localhost:5000/api/info/userinfopost",
      newUserinfo
    );
    return response.data;
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
      });
  },
});

export default userinfoSlice.reducer;
