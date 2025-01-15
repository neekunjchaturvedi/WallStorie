import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const nav = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    console.log(formData);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    // Add logic to send data to the backend (e.g., using fetch or axios)
    // Example:
    // fetch("/api/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });

    // Redirect to login
    nav("/auth/login");
  };

  return (
    <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-green-50 dark:text-gray-800">
      <h1 className="text-2xl font-bold text-center font-lato">Register</h1>
      <form noValidate="" onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1 text-sm">
          <label
            htmlFor="username"
            className="dark:text-gray-600 flex font-lato"
          >
          Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md dark:bg-white dark:text-gray-800 focus:outline-none font-lato"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="dark:text-gray-600 flex font-lato">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
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
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-white dark:text-gray-800 focus:outline-none font-lato"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label
            htmlFor="confirmPassword"
            className="dark:text-gray-600 flex font-lato"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-white dark:text-gray-800 focus:outline-none font-lato"
          />
        </div>
        <button
          type="submit"
          className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-green-600 font-lato"
        >
          Sign up
        </button>
      </form>
      <p className="text-xs text-center sm:px-6 dark:text-gray-600 font-lato">
        Already have an account?
        <button
          onClick={() => nav("/auth/login")}
          className="underline dark:text-gray-800 font-lato"
        >
          Login
        </button>
      </p>
    </div>
  );
}
