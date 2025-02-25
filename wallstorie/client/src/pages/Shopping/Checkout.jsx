import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus } from "lucide-react";
import { Hheader } from "@/components/home-components/header";
import Navbar from "@/components/home-components/Navbar";
import Address from "@/components/shopping/address";
import { useToast } from "@/hooks/use-toast";
import {
  deleteCartItem,
  fetchCartItems,
  updateCartItemQuantity,
} from "@/store/shop/cartslice";

const Checkout = () => {
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

    if (user?.id) {
      dispatch(fetchCartItems(user.id));
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
      window.location.reload();
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
  return (
    <>
      <Hheader />
      <Navbar />
      <div className="flex p-7 text-green-600">Add Address for Delivery</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-3">
        <Address />
        <div className=" space-y-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 bg-white shadow-sm"
              onClick={() => navigate(`/products/${item.productId._id}`)}
            >
              <div className="flex gap-4">
                <img
                  src={item.image || "/placeholder-image.jpg"}
                  alt={item.productName}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium text-gray-800">
                      {item.productName}
                    </h3>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
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
                      ? "Standard Roll"
                      : "Custom Size"}
                  </p>

                  {item.productType === "wallpapers" && (
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

                  {item.selectedMaterial && (
                    <p className="text-sm text-gray-600">
                      Material: {item.selectedMaterial}
                    </p>
                  )}

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-3 border rounded-lg p-1">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            item.quantity - 1,
                            item.quantity
                          )
                        }
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            item.quantity + 1,
                            item.quantity
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-medium text-lg">
                      ₹{item.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="lg:col-span-1 px-12">
            <div className="border rounded-lg p-6 bg-white shadow-sm sticky top-4">
              <h2 className="text-xl font-medium mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
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
                  <span>₹{cart?.totalAmount.toFixed(2)}</span>
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
    </>
  );
};

export default Checkout;
