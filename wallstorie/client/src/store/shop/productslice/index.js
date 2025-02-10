import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
  error: null,
  lastUpdated: "2025-02-10 17:19:06",
  currentUser: "22951a3363",
};

const generateQueryString = (sortOption, filters) => {
  const queryParams = new URLSearchParams();

  if (sortOption) {
    queryParams.append("sort", sortOption);
  }

  if (filters) {
    if (filters.price && Number(filters.price) > 0) {
      queryParams.append("price", filters.price);
    }

    if (filters.space && filters.space.length > 0) {
      queryParams.append("space", filters.space.join(","));
    }

    if (filters.trends && filters.trends.length > 0) {
      queryParams.append("trends", filters.trends.join(","));
    }
  }

  // Add tracking parameters
  queryParams.append("timestamp", "2025-02-10 17:19:06");
  queryParams.append("user", "22951a3363");

  return queryParams.toString();
};

export const getWallpaper = createAsyncThunk(
  "products/getWallpaper",
  async ({ sortOption = "popularity", filters = {} }, { rejectWithValue }) => {
    try {
      const query = generateQueryString(sortOption, filters);
      const res = await axios.get(
        `http://localhost:5000/api/shop/products/get?${query}`
      );
      if (!res.data.success) {
        return rejectWithValue(res.data.message);
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching wallpapers"
      );
    }
  }
);

export const getWallpaperrolls = createAsyncThunk(
  "products/getWallpaperrolls",
  async ({ sortOption = "popularity", filters = {} }, { rejectWithValue }) => {
    try {
      const query = generateQueryString(sortOption, filters);
      const res = await axios.get(
        `http://localhost:5000/api/shop/products/getr?${query}`
      );
      if (!res.data.success) {
        return rejectWithValue(res.data.message);
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching wallpaper rolls"
      );
    }
  }
);

export const getblinds = createAsyncThunk(
  "products/getblinds",
  async ({ sortOption = "popularity", filters = {} }, { rejectWithValue }) => {
    try {
      const query = generateQueryString(sortOption, filters);
      const res = await axios.get(
        `http://localhost:5000/api/shop/products/getb?${query}`
      );
      if (!res.data.success) {
        return rejectWithValue(res.data.message);
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching blinds"
      );
    }
  }
);

export const getcur = createAsyncThunk(
  "products/getcurtains",
  async ({ sortOption = "popularity", filters = {} }, { rejectWithValue }) => {
    try {
      const query = generateQueryString(sortOption, filters);
      const res = await axios.get(
        `http://localhost:5000/api/shop/products/getc?${query}`
      );
      if (!res.data.success) {
        return rejectWithValue(res.data.message);
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching curtains"
      );
    }
  }
);

export const getProductsByCategory = createAsyncThunk(
  "products/getByCategory",
  async ({ category, productType }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/shop/products/category?category=${category}&productType=${productType}&timestamp=2025-02-10 17:19:06&user=22951a3363`
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
        error.response?.data?.message || "Error fetching products by category"
      );
    }
  }
);

const shopProductSlice = createSlice({
  name: "Shopproducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Generic handler for all async actions
    const handlers = [
      getWallpaper,
      getWallpaperrolls,
      getblinds,
      getcur,
      getProductsByCategory,
    ];

    handlers.forEach((action) => {
      builder
        .addCase(action.pending, (state) => {
          state.isLoading = true;
          state.error = null;
          state.lastUpdated = "2025-02-10 17:19:06";
        })
        .addCase(action.fulfilled, (state, action) => {
          state.isLoading = false;
          state.productList = action.payload.data;
          state.error = null;
          state.lastUpdated = "2025-02-10 17:19:06";
        })
        .addCase(action.rejected, (state, action) => {
          state.isLoading = false;
          state.productList = [];
          state.error = action.payload || action.error.message;
          state.lastUpdated = "2025-02-10 17:19:06";
        });
    });
  },
});

export default shopProductSlice.reducer;
