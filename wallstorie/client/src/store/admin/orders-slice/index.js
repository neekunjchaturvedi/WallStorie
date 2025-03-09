import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrdersForAdmin = createAsyncThunk(
  "adminOrders/getAllOrdersForAdmin",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_PORT}/api/admin/orders/get`
    );
    return response.data; // Ensure this data structure matches what's expected in the reducer
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "adminOrders/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_PORT}/api/admin/orders/details/${id}`
    );
    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ id, status }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_PORT}/api/admin/orders/update/${id}`,
      { status }
    );
    return response.data;
  }
);

const adminOrdersSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orderList: [],
    orderDetails: null,
    status: "idle",
    error: null,
  },
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderList = action.payload.orders;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderDetails = action.payload.order;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderDetails = action.payload.order;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetOrderDetails } = adminOrdersSlice.actions;

export default adminOrdersSlice.reducer;
