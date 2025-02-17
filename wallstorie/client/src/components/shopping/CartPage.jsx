import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import { deleteCartItem, fetchCartItems, updateCartItemQty } from "@/store/shop/cartslice";
 // Import necessary actions

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, isLoading } = useSelector((state) => state.cart);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    dispatch(fetchCartItems("user-id")); // Replace with actual user ID
  }, [dispatch]);

  const handleDecrease = (productId, quantity) => {
    if (quantity > 1) {
      dispatch(
        updateCartItemQty({
          userId: "user-id",
          productId,
          quantity: quantity - 1,
        })
      );
    }
  };

  const handleIncrease = (productId, quantity) => {
    dispatch(
      updateCartItemQty({
        userId: "user-id",
        productId,
        quantity: quantity + 1,
      })
    );
  };

  const handleRemoveItem = (productId) => {
    dispatch(deleteCartItem({ userId: "user-id", productId }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

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
                  src={item.image}
                  alt={item.title}
                  className="w-32 h-32 object-cover"
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
                  {item.material && (
                    <p className="text-sm text-gray-600">
                      Material: {item.material}
                    </p>
                  )}
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleDecrease(item.productId, item.quantity)
                        }
                        disabled={item.quantity <= 1}
                        className="w-6 h-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleIncrease(item.productId, item.quantity)
                        }
                        className="w-6 h-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center hover:bg-green-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-right mt-2 font-medium">
                    ₹ {item.totalPrice}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="border p-6 rounded-lg">
            <h2 className="text-lg font-medium mb-4">Cart Summary:</h2>

            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>
                ₹ {cart.items.reduce((acc, item) => acc + item.totalPrice, 0)}
              </span>
            </div>

            <div className="mb-4">
              <p className="mb-2">Add notes:</p>
              <textarea
                placeholder="Special instructions to seller"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full border rounded-lg p-2 h-24 text-sm bg-white outline-none"
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
                />
                <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600">
                  Apply
                </button>
              </div>
            </div>

            <div className="flex justify-between font-medium mb-2">
              <span>Total</span>
              <span>
                ₹ {cart.items.reduce((acc, item) => acc + item.totalPrice, 0)}
              </span>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              All prices include tax. Shipping at checkout
            </p>

            <button className="w-full bg-green-700 text-white py-3 rounded-lg mb-3 hover:bg-green-600">
              Checkout
            </button>

            <button className="w-full border border-green-700 text-green-700 py-3 rounded-lg hover:bg-green-50">
              Continue shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
