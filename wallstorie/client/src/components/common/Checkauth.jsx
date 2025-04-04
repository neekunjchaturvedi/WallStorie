import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/home" />;
      }
    }
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/home" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    (location.pathname.includes("home") ||
      location.pathname.includes("wallpapers") ||
      location.pathname.includes("wallpaperrolls") ||
      location.pathname.includes("curtain") ||
      location.pathname.includes("blinds") ||
      location.pathname.includes("artist") ||
      location.pathname.includes("checkout") ||
      location.pathname.includes("profile"))
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
