import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { useSelector } from "react-redux";

function OrderSuccess() {
  const location = useLocation();
  const nav = useNavigate();
  const pathSegments = location.pathname.split("/");
  const id = pathSegments[pathSegments.length - 1];
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Star className="h-8 w-8 text-yellow-300 fill-yellow-300" />
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 left-1/2 h-6 w-0.5 bg-yellow-200 -translate-x-1/2 -translate-y-full"></div>
              <div className="absolute bottom-0 left-1/2 h-6 w-0.5 bg-yellow-200 -translate-x-1/2 translate-y-full"></div>
              <div className="absolute left-0 top-1/2 h-0.5 w-6 bg-yellow-200 -translate-y-1/2 -translate-x-full"></div>
              <div className="absolute right-0 top-1/2 h-0.5 w-6 bg-yellow-200 -translate-y-1/2 translate-x-full"></div>

              <div className="absolute top-0 left-0 h-4 w-0.5 bg-yellow-200 origin-bottom-right rotate-45 -translate-x-3 -translate-y-3"></div>
              <div className="absolute top-0 right-0 h-4 w-0.5 bg-yellow-200 origin-bottom-left -rotate-45 translate-x-3 -translate-y-3"></div>
              <div className="absolute bottom-0 left-0 h-4 w-0.5 bg-yellow-200 origin-top-right -rotate-45 -translate-x-3 translate-y-3"></div>
              <div className="absolute bottom-0 right-0 h-4 w-0.5 bg-yellow-200 origin-top-left rotate-45 translate-x-3 translate-y-3"></div>
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-center text-green-600 mb-4">
          Hooray! Your order is on its way!
        </h1>

        <p className="text-gray-500 text-center mb-3">
          Thank you for choosing Wallstone. We've received your order and are
          already preparing it with care.
        </p>
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => {
            {
              isAuthenticated ? nav("/profile") : nav("/auth/login");
            }
          }}
        >
          Orders
        </Button>
      </div>
    </>
  );
}

export default OrderSuccess;
