import React from "react";
import { MoveUpRight } from "lucide-react";

const Productgrid = ({ products }) => {
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
            <div className="relative">
              <img
                src={product?.image1 || "https://via.placeholder.com/500"}
                alt={product?.productName || "Product Image"}
                className="w-full h-64 object-cover transition-transform hover:scale-105"
              />
              {product?.trend == "Bestseller" && (
                <span className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 text-sm rounded-full font-lato">
                  Bestseller
                </span>
              )}
              {product?.trend == "Trending" && (
                <span className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 text-sm rounded-full font-lato">
                  Trending
                </span>
              )}
              {product?.trend == "Popular" && (
                <span className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 text-sm rounded-full font-lato">
                  Popular
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-700 font-lato flex">
                {product?.productName || "Unnamed Product"}
              </h3>
              <div className="flex justify-between">
                <p className="text-gray-600 mt-1 text-base font-medium font-lato">
                  ₹ {product?.salePrice || product?.price || "N/A"}/-
                </p>

                {/* Buy Now Button */}
                <div className="mt-4">
                  <a
                    href="#"
                    className="flex items-center text-green-700 font-medium hover:underline"
                  >
                    Buy now{" "}
                    <MoveUpRight className="ml-2 w-4 h-4 flex items-center" />
                  </a>
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
