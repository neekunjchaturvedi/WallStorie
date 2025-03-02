import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Shopping/Home";
import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./components/admin/layout";
import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/admin/Orders";
import Products from "./pages/admin/Products";
import NotFound from "./pages/not-found";
import WallPapers from "./pages/Shopping/WallPapers";
import Wallpaperrolls from "./pages/Shopping/Wallpaperrolls";
import Curtains from "./pages/Shopping/Curtains";
import Blinds from "./pages/Shopping/Blinds";
import Accounts from "./pages/Shopping/Accounts";
import Checkout from "./pages/Shopping/Checkout";
import Unauth from "./pages/unauth";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { useEffect } from "react";
import CheckAuth from "./components/common/Checkauth";
import ProductDetails from "./components/shopping/productdetails";
import Cart from "./pages/Shopping/cart";
import Artist from "./pages/Shopping/Artist";
import OrderSuccess from "./components/shopping/ordersuccess";
import Search from "./pages/Shopping/Search";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="wallpapers" element={<WallPapers />} />
      <Route path="wallpaperrolls" element={<Wallpaperrolls />} />
      <Route path="curtain" element={<Curtains />} />
      <Route path="blinds" element={<Blinds />} />
      <Route path="cart" element={<Cart />} />
      <Route path="artist" element={<Artist />} />
      {/* Changed from component to element */}
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="order/success/:id" element={<OrderSuccess />} />
      <Route path="search" element={<Search/>} />

      {/* Auth-Protected Routes */}
      <Route
        path="profile"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Accounts />
          </CheckAuth>
        }
      />
      <Route
        path="checkout"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Checkout />
          </CheckAuth>
        }
      />

      {/* Authentication Routes */}
      <Route
        path="/auth"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }
      >
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
      <Route path="/unauth" element={<Unauth />} />
    </Routes>
  );
}

export default App;
