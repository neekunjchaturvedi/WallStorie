const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isauth: false,
  isloading: false,
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {},
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
