import { checkAuth } from "@/store/auth-slice";
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log("Current Path:", location.pathname);
  console.log("Authenticated:", isAuthenticated);
  console.log("User Role:", user?.role);

  // Redirect unauthenticated users trying to access protected routes
  const protectedPaths = ["/storie", "/admin"];
  if (
    !isAuthenticated &&
    protectedPaths.some((path) => location.pathname.startsWith(path))
  ) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirect authenticated users away from login/register
  if (
    isAuthenticated &&
    ["/auth/login", "/auth/register"].includes(location.pathname)
  ) {
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" replace />
    ) : (
      <Navigate to="/storie/home" replace />
    );
  }

  // Prevent non-admin users from accessing admin routes
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/unauth" replace />;
  }

  // Prevent admin users from accessing user routes
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.startsWith("/storie")
  ) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If no conditions matched, render the children
  return <>{children}</>;
}

export default CheckAuth;
