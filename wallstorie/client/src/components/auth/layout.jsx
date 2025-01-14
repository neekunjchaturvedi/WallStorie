import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full font-lato">
      <div className="hidden lg:flex items-center justify-center bg-green-600 w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to Wall Storie
          </h1>
          <p class="text-white mb-6">
            Bring your walls to life with designs that echo your personality and
            create spaces you'll love coming home to.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}
