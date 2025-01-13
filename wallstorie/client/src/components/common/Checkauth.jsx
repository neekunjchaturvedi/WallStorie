import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function Checkauth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Redirect unauthenticated users to the login page
  if (
    !isAuthenticated &&
    !["/auth/login", "/auth/register"].some((path) =>
      location.pathname.includes(path)
    )
  ) {
    return <Navigate to="/auth/login" replace />;
  }

  // Prevent authenticated users from accessing login/register pages
  if (
    isAuthenticated &&
    ["/auth/login", "/auth/register"].some((path) =>
      location.pathname.includes(path)
    )
  ) {
    return (
      <Navigate
        to={user?.role === "admin" ? "/admin/dashboard" : "/storie/home"}
        replace
      />
    );
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth" replace />;
  }
  if (isAuthenticated && user?.role === "user") {
    <Navigate to="/storie/home" />;
  }

  return <>{children}</>;
}

export default Checkauth;
