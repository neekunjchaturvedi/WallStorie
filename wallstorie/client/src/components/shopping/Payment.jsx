import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const Payment = ({ orderDetails, shippingAddress }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast({
          variant: "destructive",
          description: "Razorpay SDK failed to load. Please try again.",
        });
        return;
      }

      // Create order on server
      const response = await axios.post("/api/payments/create-order", {
        amount: cart.totalAmount,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to create order");
      }

      const { order } = response.data;

      // Initialize Razorpay options
      const options = {
        key: process.env.RAZORPAY_KEY_ID, // Replace with your actual test key
        amount: order.amount, // Amount in smallest currency unit (paise)
        currency: order.currency,
        name: "Wall Storie",
        description: "Purchase from Wall Storie",
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment on server
            const verificationResponse = await axios.post(
              "/api/payments/verify-payment",
              {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                orderDetails: {
                  ...orderDetails,
                  shippingAddress,
                  totalAmount: cart.totalAmount,
                  userId: user.id,
                },
              }
            );

            if (verificationResponse.data.success) {
              toast({
                description: "Payment successful! Your order has been placed.",
              });

              // Navigate to success page
              navigate("/order/success", {
                state: {
                  orderId: verificationResponse.data.order._id,
                },
              });
            } else {
              throw new Error(
                verificationResponse.data.message ||
                  "Payment verification failed"
              );
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast({
              variant: "destructive",
              description:
                "Payment verification failed. Please contact support.",
            });
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: shippingAddress?.phone || "",
        },
        notes: {
          address: `${shippingAddress?.address}, ${shippingAddress?.city}, ${shippingAddress?.pincode}`,
          specialInstructions: orderDetails?.specialInstructions || "",
        },
        theme: {
          color: "#15803d", // Green color to match your theme
        },
      };

      // Open Razorpay payment form
      const razorpay = new window.Razorpay(options);
      razorpay.open();

      // Handle payment form close
      razorpay.on("payment.failed", function (response) {
        toast({
          variant: "destructive",
          description: response.error.description || "Payment failed",
        });
      });
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast({
        variant: "destructive",
        description: error.message || "Failed to initiate payment",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full bg-green-600 text-white py-4 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
    >
      {loading ? "Processing..." : "Pay with Razorpay"}
    </button>
  );
};

export default Payment;
