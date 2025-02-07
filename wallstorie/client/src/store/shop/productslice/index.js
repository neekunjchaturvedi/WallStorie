import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

const generateQueryString = (sortOption, filters) => {
  const queryParams = new URLSearchParams();
  if (sortOption) queryParams.append("sort", sortOption);
  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      if (Array.isArray(value) && value.length) {
        queryParams.append(key, value.join(","));
      } else if (value) {
        queryParams.append(key, value);
      }
    }
  }
  return queryParams.toString();
};

export const getWallpaper = createAsyncThunk(
  "products/getWallpaper",
  async ({ sortOption = "popularity", filters = {} }) => {
    const query = generateQueryString(sortOption, filters);
    const res = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}`
    );
    return res?.data;
  }
);

export const getWallpaperrolls = createAsyncThunk(
  "products/getWallpaperrolls",
  async ({ sortOption = "popularity", filters = {} }) => {
    const query = generateQueryString(sortOption, filters);
    const res = await axios.get(
      `http://localhost:5000/api/shop/products/getr?${query}`
    );
    return res?.data;
  }
);

export const getblinds = createAsyncThunk(
  "products/getblinds",
  async ({ sortOption = "popularity", filters = {} }) => {
    const query = generateQueryString(sortOption, filters);
    const res = await axios.get(
      `http://localhost:5000/api/shop/products/getb?${query}`
    );
    return res?.data;
  }
);

export const getcur = createAsyncThunk(
  "products/getcurtains",
  async ({ sortOption = "popularity", filters = {} }) => {
    const query = generateQueryString(sortOption, filters);
    const res = await axios.get(
      `http://localhost:5000/api/shop/products/getc?${query}`
    );
    return res?.data;
  }
);

const shopProductSlice = createSlice({
  name: "Shopproducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWallpaper.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWallpaper.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getWallpaper.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(getWallpaperrolls.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWallpaperrolls.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getWallpaperrolls.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(getblinds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getblinds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getblinds.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(getcur.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getcur.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getcur.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default shopProductSlice.reducer;
