import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
};

// Register User
export const registeruser = createAsyncThunk(
  "auth/register",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PORT}/api/auth/register`,
        formdata,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error in API call:", err.response?.data);
      return rejectWithValue(err.response?.data || "Registration failed");
    }
  }
);

// Login User
export const loginuser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PORT}/api/auth/login`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // Store the token securely
        localStorage.setItem("accessToken", response.data.accessToken);

        // Set default auth header for future requests
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
      }

      return response.data;
    } catch (err) {
      console.error("Error in API call:", err.response?.data);
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);

// Logout User
export const logoutuser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PORT}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      // Clear local storage and auth headers
      localStorage.removeItem("accessToken");
      delete axios.defaults.headers.common["Authorization"];

      return response.data;
    } catch (err) {
      console.error("Error in API call:", err.response?.data);
      return rejectWithValue(err.response?.data || "Logout failed");
    }
  }
);

// Check Auth
export const checkAuth = createAsyncThunk(
  "auth/checkauth",
  async (_, { rejectWithValue }) => {
    try {
      // Get token from local storage or URL parameter
      const token = localStorage.getItem("accessToken");

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      // Set the authorization header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.get(
        `${import.meta.env.VITE_PORT}/api/auth/check-auth`,
        {
          withCredentials: true,
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        }
      );

      return response.data;
    } catch (err) {
      console.error("Error in API call:", err.response?.data);
      localStorage.removeItem("accessToken");
      delete axios.defaults.headers.common["Authorization"];
      return rejectWithValue(err.response?.data || "Failed to verify auth");
    }
  }
);

// Process Google Authentication
export const processGoogleAuth = createAsyncThunk(
  "auth/processGoogleAuth",
  async (token, { rejectWithValue }) => {
    try {
      // Store the token from URL parameter
      localStorage.setItem("accessToken", token);

      // Set the authorization header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Check auth to get user data
      const response = await axios.get(
        `${import.meta.env.VITE_PORT}/api/auth/check-auth`,
        {
          withCredentials: true,
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        }
      );

      return response.data;
    } catch (err) {
      console.error("Error processing Google auth:", err.response?.data);
      localStorage.removeItem("accessToken");
      delete axios.defaults.headers.common["Authorization"];
      return rejectWithValue(
        err.response?.data || "Failed to authenticate with Google"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.user;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null; // Clear error state
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registeruser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registeruser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = !!action.payload.user;
      })
      .addCase(registeruser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Login User
      .addCase(loginuser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = !!action.payload.success;
      })
      .addCase(loginuser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // Logout User
      .addCase(logoutuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutuser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutuser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // Process Google Auth
      .addCase(processGoogleAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(processGoogleAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = true;
      })
      .addCase(processGoogleAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

// Actions
export const { setUser, clearError } = authSlice.actions;

// Reducer
export default authSlice.reducer;
