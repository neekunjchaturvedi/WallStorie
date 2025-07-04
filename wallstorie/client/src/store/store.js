import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsSlice from "./admin/products-slice";
import shopProductSlice from "./shop/productslice";
import cartReducer from "./shop/cartslice";
import shopAddressSlice from "./shop/addressslice";
import shoppingOrderReducer from "./shop/ordersslice";
import adminOrdersReducer from "./admin/orders-slice";
import shopsearchSlice from "./shop/searchslice";
import reviewReducer from "./shop/reviewslice";
import userinforeducer from "./shop/userinfoslice";
import { productsApi } from "./shop/productslice";

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    auth: authReducer,
    adminProducts: adminProductsSlice,
    adminOrders: adminOrdersReducer,
    shopProducts: shopProductSlice,
    cart: cartReducer,
    shopAddress: shopAddressSlice,
    shoppingOrder: shoppingOrderReducer,
    search: shopsearchSlice,
    review: reviewReducer,
    userinfo: userinforeducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export default store;
