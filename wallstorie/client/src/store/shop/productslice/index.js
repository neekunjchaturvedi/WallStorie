import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
  error: null,
};

// Helper function to generate query string from filters
const generateQueryString = (sortOption, filters) => {
  const queryParams = new URLSearchParams();

  // Add sort option
  if (sortOption) {
    queryParams.append("sort", sortOption);
  }

  // Add filters if they exist and have values
  if (filters) {
    // Price filter
    if (filters.price && Number(filters.price) > 0) {
      queryParams.append("price", filters.price);
    }

    // Spaces filter
    if (filters.space && filters.space.length > 0) {
      queryParams.append("spaces", filters.space.join(","));
    }

    // Trends filter
    if (filters.trends && filters.trends.length > 0) {
      queryParams.append("trends", filters.trends.join(","));
    }
  }

  return queryParams.toString();
};

// Create async thunks for each product type
export const getWallpaper = createAsyncThunk(
  "products/getWallpaper",
  async ({ sortOption = "popularity", filters = {} }) => {
    try {
      const query = generateQueryString(sortOption, filters);
      const res = await axios.get(
        `http://localhost:5000/api/shop/products/get?${query}`
      );
      return res?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getWallpaperrolls = createAsyncThunk(
  "products/getWallpaperrolls",
  async ({ sortOption = "popularity", filters = {} }) => {
    try {
      const query = generateQueryString(sortOption, filters);
      const res = await axios.get(
        `http://localhost:5000/api/shop/products/getr?${query}`
      );
      return res?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getblinds = createAsyncThunk(
  "products/getblinds",
  async ({ sortOption = "popularity", filters = {} }) => {
    try {
      const query = generateQueryString(sortOption, filters);
      const res = await axios.get(
        `http://localhost:5000/api/shop/products/getb?${query}`
      );
      return res?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getcur = createAsyncThunk(
  "products/getcurtains",
  async ({ sortOption = "popularity", filters = {} }) => {
    try {
      const query = generateQueryString(sortOption, filters);
      const res = await axios.get(
        `http://localhost:5000/api/shop/products/getc?${query}`
      );
      return res?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getProductsByCategory = createAsyncThunk(
  "products/getByCategory",
  async ({ category, productType }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/shop/products/category?category=${category}&productType=${productType}`
      );

      if (!res.data.success) {
        return rejectWithValue(
          res.data.message || "Failed to fetch products by category"
        );
      }

      return res.data;
    } catch (error) {
      console.error("Error in getProductsByCategory:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          "An error occurred while fetching products by category"
      );
    }
  }
);

const shopProductSlice = createSlice({
  name: "Shopproducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Wallpaper cases
    builder
      .addCase(getWallpaper.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWallpaper.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
        state.error = null;
      })
      .addCase(getWallpaper.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.error.message;
      })

      // Wallpaper rolls cases
      .addCase(getWallpaperrolls.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWallpaperrolls.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
        state.error = null;
      })
      .addCase(getWallpaperrolls.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.error.message;
      })

      // Blinds cases
      .addCase(getblinds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getblinds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
        state.error = null;
      })
      .addCase(getblinds.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.error.message;
      })

      // Curtains cases
      .addCase(getcur.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getcur.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
        state.error = null;
      })
      .addCase(getcur.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.error.message;
      })
      .addCase(getProductsByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
        state.error = null;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.payload || "Failed to fetch products by category";
      });
  },
});

export default shopProductSlice.reducer;
