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
import Checkauth from "./components/common/Checkauth";
import Storie from "./components/storie";
import { Outlet } from "react-router-dom";

function App() {
  const isAuthenticated = true;
  const user = {
    name: "Neekunj",
    role: "user",
  };

  return (
    <Routes>
      {/* Storie Routes */}
      <Route
        path="/storie"
        element={
          <Checkauth isAuthenticated={isAuthenticated} user={user}>
            <Storie />
          </Checkauth>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="wallpapers" element={<WallPapers />} />
        <Route path="wallpaperrolls" element={<Wallpaperrolls />} />
        <Route path="curtain" element={<Curtains />} />
        <Route path="blinds" element={<Blinds />} />
        <Route path="profile" element={<Accounts />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>

      {/* Authentication Routes */}
      <Route
        path="/auth"
        element={
          <Checkauth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </Checkauth>
        }
      >
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <Checkauth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </Checkauth>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
