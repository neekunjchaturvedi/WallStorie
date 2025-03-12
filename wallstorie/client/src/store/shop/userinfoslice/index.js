import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  userinfo: [],
  allUsers: [], // Initialize allUsers as an empty array
  status: "idle",
  submissionStatus: "idle", // Track submission status separately
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
  async (newUserinfo, { rejectWithValue }) => {
    try {
      console.log("Sending to API:", newUserinfo); // Debug log
      const response = await axios.post(
        `${import.meta.env.VITE_PORT}/api/info/userinfopost`,
        newUserinfo,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error(
        "Error submitting user info:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || { error: "Failed to submit user information" }
      );
    }
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
  reducers: {
    // Add a reset status action to clear states after operations
    resetSubmissionStatus: (state) => {
      state.submissionStatus = "idle";
      state.error = null;
    },
  },
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
      // Add better tracking of addUserinfo states
      .addCase(addUserinfo.pending, (state) => {
        state.submissionStatus = "loading";
      })
      .addCase(addUserinfo.fulfilled, (state, action) => {
        state.submissionStatus = "succeeded";
        // Only add to the array if the data format is correct
        if (action.payload && !action.payload.error) {
          state.userinfo.push(action.payload);
        }
      })
      .addCase(addUserinfo.rejected, (state, action) => {
        state.submissionStatus = "failed";
        state.error = action.payload || "Failed to submit user information";
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

// Export the reset action
export const { resetSubmissionStatus } = userinfoSlice.actions;

export default userinfoSlice.reducer;
