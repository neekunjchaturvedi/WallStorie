import React from "react";
import { MoveUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Productgrid = ({ products, handlegetdetails }) => {
  const navigate = useNavigate();

  const navigateToProductDetails = (productId) => {
    // Call handlegetdetails with the navigation data
    handlegetdetails(productId);

    // Navigate to product details page with timestamp and user data
    navigate(`/products/${productId}`);
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 mb-6">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="rounded-lg shadow-lg overflow-hidden border bg-white"
          >
            {/* Image Section */}
            <div
              className="relative cursor-pointer"
              onClick={() => navigateToProductDetails(product._id)}
            >
              <img
                src={product?.image1 || "https://via.placeholder.com/500"}
                alt={product?.productName || "Product Image"}
                className="w-full h-64 object-contain transition-transform hover:scale-90"
              />
              {product?.trend == "bestseller" && (
                <span className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 text-sm rounded-full font-lato">
                  Bestseller
                </span>
              )}
              {product?.trend == "newarrival" && (
                <span className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 text-sm rounded-full font-lato">
                  New Arrival
                </span>
              )}
              {product?.trend == "popular" && (
                <span className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 text-sm rounded-full font-lato">
                  Popular
                </span>
              )}
              {product?.trend == "trending" && (
                <span className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 text-sm rounded-full font-lato">
                  Trending
                </span>
              )}
              {product?.trend == "seasonal" && (
                <span className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 text-sm rounded-full font-lato">
                  Seasonal
                </span>
              )}
              {product?.stockQuantity < 10 && (
                <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 text-sm rounded-full font-lato">
                  Only {product?.stockQuantity} left
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="p-5">
              <h3
                className="text-lg font-semibold text-gray-700 font-lato flex cursor-pointer"
                onClick={() => navigateToProductDetails(product._id)}
              >
                {product?.productName || "Unnamed Product"}
              </h3>
              <div className="flex justify-between">
                <p className="text-gray-600 mt-1 text-base font-medium font-lato">
                  ₹ {product?.salePrice || product?.price || "N/A"}/-
                </p>

                {/* Buy Now Button */}
                <div className="mt-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToProductDetails(product._id);
                    }}
                    className="flex items-center text-green-700 font-medium hover:underline"
                  >
                    Buy now{" "}
                    <MoveUpRight className="ml-2 w-4 h-4 flex items-center" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productgrid;
