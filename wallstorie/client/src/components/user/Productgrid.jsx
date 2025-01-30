import React from "react";
import { ArrowRight } from "lucide-react";

const Productgrid = ({ products }) => {
    return (
      <div className="px-10 mb-6">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="max-w-sm rounded-lg shadow-lg overflow-hidden border"
            >
              {/* Image Section */}
              <div className="relative">
                <img
                  src={product?.image1 || "https://via.placeholder.com/500"}
                  alt={product?.productName || "Product Image"}
                  className="w-full h-64 object-cover transition-transform hover:scale-105"
                />
                {product?.bestseller && (
                  <span className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 text-sm rounded-full">
                    Bestseller
                  </span>
                )}
              </div>
  
              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-green-800">
                  {product?.productName || "Unnamed Product"}
                </h3>
                <p className="text-gray-600 mt-1">
                  ₹ {product?.salePrice || product?.price || "N/A"}/sq.ft.
                </p>
  
                {/* Buy Now Button */}
                <div className="mt-3">
                  <a
                    href="#"
                    className="flex items-center text-green-700 font-medium hover:underline"
                  >
                    Buy now <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default Productgrid;
