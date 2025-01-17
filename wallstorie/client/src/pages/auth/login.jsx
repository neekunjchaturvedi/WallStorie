import { useToast } from "@/hooks/use-toast";
import { loginuser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  // Handle form submission
  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginuser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Redirect to the signup page
  const redirect = () => {
    nav("/auth/register");
  };

  return (
    <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-green-50 dark:text-gray-800">
      <h1 className="text-2xl font-bold text-center font-lato">Login</h1>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="dark:text-gray-600 flex font-lato">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-md dark:bg-white dark:text-gray-800 focus:outline-none font-lato"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label
            htmlFor="password"
            className="dark:text-gray-600 flex font-lato"
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
            className="w-full px-4 py-3 rounded-md dark:bg-white dark:text-gray-800 focus:outline-none font-lato"
          />
        </div>
        <button
          type="submit"
          className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-green-600 font-lato"
        >
          Sign in
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
