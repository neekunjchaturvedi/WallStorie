import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
  productdetails: {},
  error: null,
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

    // Handle multiple colors
    if (filters.color && filters.color.length > 0) {
      queryParams.append("color", filters.color.join(","));
    }
  }

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
  async (
    { category, productType, sortOption, filters = {} },
    { rejectWithValue }
  ) => {
    try {
      const query = generateQueryString(sortOption, filters);
      const res = await axios.get(
        `http://localhost:5000/api/shop/products/category?category=${category}&productType=${productType}&${query}`
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

export const getproductinfo = createAsyncThunk(
  "products/getproductinfo",
  async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/shop/products/get/${id}`
      );
      return res.data;
    } catch (error) {
      return error.response?.data?.message || "Error fetching product details";
    }
  }
);

const shopProductSlice = createSlice({
  name: "Shopproducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
        })
        .addCase(action.fulfilled, (state, action) => {
          state.isLoading = false;
          state.productList = action.payload.data;
          state.error = null;
        })
        .addCase(action.rejected, (state, action) => {
          state.isLoading = false;
          state.productList = [];
          state.error = action.payload || action.error.message;
        });
    });
    builder
      .addCase(getproductinfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getproductinfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productdetails = action.payload.data; // Ensure the correct path
        state.error = null;
      })
      .addCase(getproductinfo.rejected, (state, action) => {
        state.isLoading = false;
        state.productdetails = {};
        state.error = action.payload || action.error.message;
      });
  },
});

export default shopProductSlice.reducer;
