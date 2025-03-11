import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, Minus, Plus } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import {
  deleteCartItem,
  fetchCartItems,
  updateCartItemQuantity,
} from "@/store/shop/cartslice";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { cart, items, isLoading } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [specialInstructions, setSpecialInstructions] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [applyingPromo, setApplyingPromo] = useState(false);
  const [deletingItemIds, setDeletingItemIds] = useState(new Set());

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }
    if (user.role == "admin") {
      navigate("/admin/dashboard");
    }

    if (user?.id) {
      dispatch(fetchCartItems(user.id));
      console.log("Navigation State:", {
        timestamp: "2025-02-23 10:35:16",
        userLogin: "22951a3363",
      });
    }
  }, [dispatch, user, isAuthenticated, navigate]);

  const handleQuantityChange = async (itemId, newQuantity, currentQuantity) => {
    if (newQuantity < 1 || newQuantity === currentQuantity) return;

    try {
      await dispatch(
        updateCartItemQuantity({
          userId: user.id,
          itemId,
          quantity: newQuantity,
        })
      ).unwrap();

      toast({
        description: "Cart updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to update quantity",
      });
    }
  };

  const handleRemoveItem = async (itemId) => {
    if (deletingItemIds.has(itemId)) return;

    try {
      setDeletingItemIds((prev) => new Set([...prev, itemId]));

      console.log("Attempting to delete item:", { userId: user.id, itemId }); // Debug log

      const result = await dispatch(
        deleteCartItem({
          userId: user.id,
          itemId,
        })
      ).unwrap();

      if (result.success) {
        toast({
          description: "Item removed from cart",
        });
        // Refresh cart data
        dispatch(fetchCartItems(user.id));
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        variant: "destructive",
        description: "Failed to remove item",
      });
    } finally {
      setDeletingItemIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    setApplyingPromo(true);
    try {
      // Implement promo code logic here
      toast({
        description: "Promo code applied successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Invalid promo code",
      });
    } finally {
      setApplyingPromo(false);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        specialInstructions,
        promoCode: promoCode.trim() || null,
      },
    });
  };
  function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500" />
      </div>
    );
  }

  if (!items?.length) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-medium text-green-800 mb-8">My Cart</h1>
        <div className="text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/wallpapers")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-medium text-green-800 mb-8">My Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6 font-lato">
          {items.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 bg-white shadow-sm cursor-pointer"
              onClick={() => navigate(`/products/${item.productId._id}`)}
            >
              <div className="text-md font-medium text-gray-800 playfair">
                {capitalizeFirstLetter(item.productType)}
              </div>
              <div className="flex gap-4">
                <img
                  src={item.image || "/placeholder-image.jpg"}
                  alt={item.productName}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium text-gray-800 playfair">
                      {item.productName}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveItem(item._id);
                      }}
                      disabled={deletingItemIds.has(item._id)}
                      className={`text-gray-400 hover:text-red-500 transition-colors ${
                        deletingItemIds.has(item._id)
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    Size:{" "}
                    {item.productType === "wallpaperRolls" ||
                    item.productType === "curtains"
                      ? "Standard"
                      : "Custom Size"}
                  </p>

                  {(item.productType == "wallpapers" ||
                    item.productType == "blinds" ||
                    item.productType == "artist") && (
                    <>
                      <p className="text-sm text-gray-600">
                        Height: {item.height} inches
                      </p>
                      <p className="text-sm text-gray-600">
                        Width: {item.width} inches
                      </p>
                      <p className="text-sm text-gray-600">
                        Area: {item.area} sq.ft
                      </p>
                    </>
                  )}
                  {item.productType == "curtains" && (
                    <>
                      <p className="text-sm text-gray-600">
                        Length: {item.area} m
                      </p>
                    </>
                  )}

                  {item.selectedMaterial && (
                    <p className="text-sm text-gray-600">
                      Material: {item.selectedMaterial}
                    </p>
                  )}

                  <div className="flex justify-between flex-col items-center mt-4">
                    <div className="flex items-center gap-3 border rounded-lg p-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(
                            item._id,
                            item.quantity - 1,
                            item.quantity
                          );
                        }}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(
                            item._id,
                            item.quantity + 1,
                            item.quantity
                          );
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-medium text-md">
                      ₹{item.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 bg-white shadow-sm sticky top-4">
            <h2 className="text-xl font-medium mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6 font-lato">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cart?.totalItems} items)</span>
                <span>₹{cart?.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              {promoCode && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹0.00</span>
                </div>
              )}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span className="font-lato">
                  ₹{cart?.totalAmount.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                (Including all applicable taxes)
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any special instructions for your order?"
                  className="w-full border rounded-lg p-2 text-sm min-h-[80px] resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                  <button
                    onClick={handleApplyPromo}
                    disabled={applyingPromo || !promoCode.trim()}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate("/wallpapers")}
                className="w-full border border-green-600 text-green-600 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
