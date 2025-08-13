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
import { useEffect, useState } from "react";
import CheckAuth from "./components/common/Checkauth";
import ProductDetails from "./components/shopping/productdetails";
import Cart from "./pages/Shopping/Cart";
import Artist from "./pages/Shopping/Artist";
import OrderSuccess from "./components/shopping/ordersuccess";
import Search from "./pages/Shopping/Search";
import Sellart from "./components/shopping/Sellart";
import Reachout from "./components/shopping/reachout";
import ShippingPolicy from "./pages/common/ShippingPolicy";
import Privacy from "./pages/common/Privacypolicy";
import Termsandcondition from "./pages/common/Termsandc";
import ScrollToTop from "./components/common/ScrollToTop";

import loader from "./assets/loader.gif";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        dispatch(checkAuth());
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-white">
        <img src={loader} alt="Loading..." className="w-100 h-100" />
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="wallpapers" element={<WallPapers />} />
        <Route path="wallpaperrolls" element={<Wallpaperrolls />} />
        <Route path="curtain" element={<Curtains />} />
        <Route path="blinds" element={<Blinds />} />
        <Route path="cart" element={<Cart />} />
        <Route path="artist" element={<Artist />} />
        <Route path="sellart" element={<Sellart />} />
        <Route path="reachout" element={<Reachout />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="search" element={<Search />} />
        <Route path="shipping" element={<ShippingPolicy />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Termsandcondition />} />
        <Route
          path="order/success/:id"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <OrderSuccess />
            </CheckAuth>
          }
        />
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
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth" element={<Unauth />} />
      </Routes>
    </>
  );
}

export default App;
