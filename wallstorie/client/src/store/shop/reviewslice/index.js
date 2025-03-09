import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
  averageRating: 0,
};

export const addReview = createAsyncThunk(
  "review/addReview",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_PORT}/api/shop/review/add`,
      formData
    );
    return response.data;
  }
);

export const getReviews = createAsyncThunk("review/getReviews", async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_PORT}/api/shop/review/${id}`
  );
  return response.data;
});

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data || [];
        state.averageRating =
          action.payload.data.reduce(
            (sum, review) => sum + review.reviewValue,
            0
          ) / action.payload.data.length;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      })
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews.push(action.payload.data);
        state.averageRating =
          state.reviews.reduce((sum, review) => sum + review.reviewValue, 0) /
          state.reviews.length;
      })
      .addCase(addReview.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default reviewSlice.reducer;
