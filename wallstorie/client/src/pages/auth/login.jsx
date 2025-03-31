import { useToast } from "@/hooks/use-toast";
import { loginuser, processGoogleAuth } from "@/store/auth-slice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const nav = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.auth
  );

  // Check if user is already authenticated on component mount
  useEffect(() => {
    if (isAuthenticated && user.role == "admin") {
      nav("/admin/dashboard");
    }
  }, [isAuthenticated, nav]);

  // Handle Google OAuth redirect
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const googleLoginStatus = params.get("googleLogin");
    const token = params.get("token");

    if (googleLoginStatus === "success" && token) {
      dispatch(processGoogleAuth(token))
        .then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            toast({
              title: "Google login successful!",
            });
            nav("/home");
          } else {
            toast({
              title: "Google login failed",
              description: result.payload || "Authentication failed",
              variant: "destructive",
            });
          }
        })
        .catch((error) => {
          console.error("Google auth error:", error);
          toast({
            title: "Google login error",
            description: "An unexpected error occurred",
            variant: "destructive",
          });
        });
    } else if (googleLoginStatus === "failure") {
      toast({
        title: "Google login failed",
        description: "Could not authenticate with Google",
        variant: "destructive",
      });
    }

    // Clear the URL parameters after processing
    if (googleLoginStatus) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location.search, dispatch, toast, nav]);

  // Handle form submission
  function onSubmit(event) {
    event.preventDefault();

    if (!formData.identifier || !formData.password) {
      toast({
        title: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    dispatch(loginuser(formData))
      .then((result) => {
        if (result.payload?.success) {
          toast({
            title: result.payload.message || "Login successful",
          });
          nav("/home");
        } else {
          toast({
            title: result.payload?.message || "Login failed",
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        toast({
          title: "Login error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      });
  }

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const redirect = () => {
    nav("/auth/register");
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_PORT}/api/auth/google`;
  };

  return (
    <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-green-50 text-gray-800">
      <h1 className="text-2xl font-bold text-center font-lato">Login</h1>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-1 text-sm">
          <label
            htmlFor="identifier"
            className="text-gray-600 flex font-lato"
          >
            Email or Phone
          </label>
          <input
            type="text"
            name="identifier"
            id="identifier"
            value={formData.identifier}
            onChange={handleChange}
            placeholder="Email or Phone"
            className="w-full px-4 py-3 rounded-md bg-white text-gray-800 focus:outline-none font-lato"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label
            htmlFor="password"
            className="text-gray-600 flex font-lato"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md bg-white text-gray-800 focus:outline-none font-lato"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`block w-full p-3 text-center rounded-sm text-gray-50 bg-green-600 font-lato ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className={`flex items-center justify-center w-full p-3 mt-4 text-center border rounded-sm text-gray-800 border-gray-800 font-lato ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          <FcGoogle className="mr-2" />
          Sign in with Google
        </button>
      </form>
      <p className="text-xs text-center sm:px-6 dark:text-gray-600 font-lato">
        Don't have an account?
        <button
          onClick={redirect}
          className="ml-1 underline dark:text-gray-800 font-lato"
        >
          Signup
        </button>
      </p>
    </div>
  );
}
