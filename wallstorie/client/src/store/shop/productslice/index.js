import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

export const getWallpaper = createAsyncThunk(
  "/products/getWallpaper",

  async () => {
    const res = await axios.get("http://localhost:5000/api/admin/products/get");
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
      });
  },
});

export default shopProductSlice.reducer;
