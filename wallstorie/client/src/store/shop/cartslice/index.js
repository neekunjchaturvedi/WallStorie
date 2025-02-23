import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/cart/${userId}`
    );
    return response.data;
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartData) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/cart/add",
      cartData
    );
    return response.data;
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ userId, itemId, quantity }) => {
    const response = await axios.put(
      "http://localhost:5000/api/shop/cart/updateQuantity",
      {
        userId,
        itemId,
        quantity,
      }
    );
    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteItem",
  async ({ userId, itemId }, { rejectWithValue }) => {
    try {
      console.log("Deleting item:", { userId, itemId }); // Debug log
      const response = await axios.delete(
        `http://localhost:5000/api/shop/cart/${userId}/item/${itemId}`
      );
      return response.data;
    } catch (error) {
      console.error("Delete error in slice:", error.response?.data || error); // Debug log
      return rejectWithValue(
        error.response?.data || { message: "Failed to delete item" }
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cart Items
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data.cart;
        state.items = action.payload.data.items;
        state.error = null;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data.cart;
        state.items = action.payload.data.items;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Update Quantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data.cart;
        state.items = action.payload.data.items;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Delete Item
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data.cart;
        state.items = action.payload.data.items;
        state.error = null;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
