import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/cart/${userId}`
    );
    return response.data.data;
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartItem) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/cart/add",
      cartItem
    );
    return response.data.data;
  }
);

export const updateCartItemQty = createAsyncThunk(
  "cart/updateCartItemQty",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      "http://localhost:5000/api/shop/cart/update",
      {
        userId,
        productId,
        quantity,
      }
    );
    return response.data.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `http://localhost:5000/api/shop/cart/delete/${userId}/${productId}`
    );
    return response.data.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: {
      items: [],
    },
    isLoading: false,
    error: null,
  },
  reducers: {},
  // cartslice.js (only showing the modified extraReducers)
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateCartItemQty.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartItemQty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload; // Update the entire cart state
      })
      .addCase(updateCartItemQty.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
