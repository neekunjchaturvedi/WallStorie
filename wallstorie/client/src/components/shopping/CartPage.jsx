import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, ShoppingBag } from "lucide-react";
import {
  deleteCartItem,
  fetchCartItems,
  updateCartItemQty,
} from "@/store/shop/cartslice/index";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, isLoading } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    console.log("Navigation State:", {
      timestamp: "2025-02-20 17:42:20",
      userLogin: "22951a3363",
    });

    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }

    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user, isAuthenticated, navigate]);

  // cartpage.jsx (only showing the modified functions)
  const handleDecrease = async (productId, quantity) => {
    if (quantity <= 1) return;

    try {
      console.log("Decreasing quantity for product:", { productId, quantity });
      const result = await dispatch(
        updateCartItemQty({
          userId: user.id,
          productId,
          quantity: quantity - 1,
        })
      ).unwrap();

      console.log("Update result:", result);

      if (result) {
        toast({
          description: "Quantity decreased",
        });
      }
    } catch (error) {
      console.error("Decrease error:", error);
      toast({
        variant: "destructive",
        description: "Failed to decrease quantity",
      });
    }
  };

  const handleIncrease = async (productId, quantity) => {
    try {
      console.log("Increasing quantity for product:", { productId, quantity });
      const result = await dispatch(
        updateCartItemQty({
          userId: user.id,
          productId,
          quantity: quantity + 1,
        })
      ).unwrap();

      console.log("Update result:", result);

      if (result) {
        toast({
          description: "Quantity increased",
        });
      }
    } catch (error) {
      console.error("Increase error:", error);
      toast({
        variant: "destructive",
        description: "Failed to increase quantity",
      });
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const result = await dispatch(
        deleteCartItem({
          userId: user.id,
          productId: productId,
        })
      ).unwrap();

      if (result) {
        toast({
          description: "Item removed from cart",
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        variant: "destructive",
        description: "Failed to remove item",
      });
    }
  };

  const handleContinueShopping = () => {
    navigate("/shop");
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!cart?.items?.length) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-medium text-green-800 mb-8">My Cart</h1>
        <div className="text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <button
            onClick={handleContinueShopping}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  const subtotal = cart.items.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-medium text-green-800 mb-8">My Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.items.map((item) => (
            <div key={item.productId} className="border-b pb-6">
              <div className="flex gap-6">
                <img
                  src={item.image || "/placeholder-image.jpg"}
                  alt={item.productName}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-green-800">
                    {item.productName}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Size:{" "}
                    {item.productType === "wallpaperRolls"
                      ? "Standard Roll"
                      : "Custom Roll"}
                  </p>
                  {item.productType !== "wallpaperRolls" && (
                    <>
                      <p className="text-sm text-gray-600">
                        Height: {item.height} inches
                      </p>
                      <p className="text-sm text-gray-600">
                        Width: {item.width} inches
                      </p>
                      <p className="text-sm text-gray-600">
                        Total Area: {item.area} sq.ft
                      </p>
                    </>
                  )}
                  {item.selectedMaterial && (
                    <p className="text-sm text-gray-600">
                      Material: {item.selectedMaterial}
                    </p>
                  )}
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleDecrease(item.productId, item.quantity)
                        }
                        disabled={item.quantity <= 1 || isLoading}
                        className="w-6 h-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleIncrease(item.productId, item.quantity)
                        }
                        disabled={isLoading}
                        className="w-6 h-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center hover:bg-green-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      disabled={isLoading}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-right mt-2 font-medium">
                    ₹ {item.totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="border p-6 rounded-lg sticky top-4">
            <h2 className="text-lg font-medium mb-4">Cart Summary</h2>

            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>₹ {subtotal.toFixed(2)}</span>
            </div>

            <div className="mb-4">
              <p className="mb-2">Add notes:</p>
              <textarea
                placeholder="Special instructions to seller"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full border rounded-lg p-2 h-24 text-sm bg-white outline-none resize-none"
              />
            </div>

            <div className="mb-6">
              <p className="mb-2">Enter discounts or promo codes:</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 border-2 rounded p-2 text-sm bg-white outline-none"
                  placeholder="Enter code"
                />
                <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                  Apply
                </button>
              </div>
            </div>

            <div className="flex justify-between font-medium mb-2">
              <span>Total</span>
              <span>₹ {subtotal.toFixed(2)}</span>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              All prices include tax. Shipping calculated at checkout
            </p>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-700 text-white py-3 rounded-lg mb-3 hover:bg-green-600 transition-colors"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={handleContinueShopping}
              className="w-full border border-green-700 text-green-700 py-3 rounded-lg hover:bg-green-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
