import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsSlice from "./admin/products-slice";
import shopProductSlice from "./shop/productslice";
import cartReducer from "./shop/cartslice";
import shopAddressSlice from "./shop/addressslice";
import shoppingOrderReducer from "./shop/ordersslice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    shopProducts: shopProductSlice,
    cart: cartReducer,
    shopAddress: shopAddressSlice,
    shoppingOrder: shoppingOrderReducer,
  },
});

export default store;
