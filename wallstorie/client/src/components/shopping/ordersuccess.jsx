import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

function OrderSuccess() {
  const location = useLocation();
  const nav = useNavigate();
  const pathSegments = location.pathname.split("/");
  const id = pathSegments[pathSegments.length - 1];
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div className="max-h-full flex justify-center flex-col items-center text-3xl mt-20 text-green-700">
      Order Placed Successfully
      <div className="text-lg">
        Your Order Id is <span className="text-red-700">{id}</span>{" "}
      </div>
      <Button
        className="bg-green-600 hover:bg-green-700"
        onclick={() => {
          {
            isAuthenticated ? nav("/profile") : nav("/auth/login");
          }
        }}
      >
        Orders
      </Button>
    </div>
  );
}

export default OrderSuccess;
