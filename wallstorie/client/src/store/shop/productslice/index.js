import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  productlist: [],
};

export const getWallpaper = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(
      "http://localhost:5000/api/shop/products/get"
    );

    return result?.data;
  }
);

const shopProductSlice = createSlice({
  name: "Shopproducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWallpaper.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getWallpaper.fulfilled, (state, action) => {
        (state.isLoading = false), (state.productlist = action.payload);
      })
      .addCase(getWallpaper.rejected, (state, action) => {
        (state.isLoading = false), (state.productlist = []);
      });
  },
});

export default shopProductSlice.reducer;
