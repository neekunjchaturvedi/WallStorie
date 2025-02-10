import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ActivityLogIcon } from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import UserLayout from "@/components/user/layout";
import Productgrid from "@/components/user/Productgrid";
import FilterDropdown from "@/components/shopping/filterdropdown";
import Footer from "../home-components/Footer";
import { Bottomfoot } from "../home-components/Bottomfoot";

import {
  getblinds,
  getcur,
  getProductsByCategory,
  getWallpaper,
  getWallpaperrolls,
} from "@/store/shop/productslice";

function capitalizeFirstLetter(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Layout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const pathSegments = location.pathname.split("/");
  const name = pathSegments[pathSegments.length - 1];

  const [sortOption, setSortOption] = useState("popularity");
  const [filters, setFilters] = useState({
    price: "0",
    space: [],
    trends: [],
  });

  const { productList, isLoading } = useSelector((state) => state.shopProducts);

  const fetchProducts = () => {
    console.log("Fetching products with filters:", filters);
    const options = {
      sortOption,
      filters: {
        price: filters.price,
        space: filters.space,
        trends: filters.trends,
      },
    };

    switch (name) {
      case "wallpapers":
        dispatch(getWallpaper(options));
        break;
      case "wallpaperrolls":
        dispatch(getWallpaperrolls(options));
        break;
      case "blinds":
        dispatch(getblinds(options));
        break;
      default:
        dispatch(getcur(options));
        break;
    }
  };
  const handleCategoryClick = (categoryName) => {
    const options = {
      category: categoryName,
      productType: name,
    };
    dispatch(getProductsByCategory(options));
  };
  console.log(productList);

  useEffect(() => {
    fetchProducts();
  }, [dispatch, name, sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const applyFilters = () => {
    console.log("Applying filters:", filters);
    fetchProducts();
  };

  const categoryImages = {
    wallpapers: [
      {
        name: "tropical",
        image: "https://source.unsplash.com/300x300/?tropical",
      },
      {
        name: "heritage",
        image: "https://source.unsplash.com/300x300/?heritage",
      },
      { name: "divine", image: "https://source.unsplash.com/300x300/?ganesha" },
      {
        name: "kidsSeries",
        image: "https://source.unsplash.com/300x300/?kids",
      },
    ],
    blinds: [
      {
        name: "roller",
        image: "https://source.unsplash.com/300x300/?roller_blinds",
      },
      {
        name: "zebra",
        image: "https://source.unsplash.com/300x300/?zebra_blinds",
      },
      {
        name: "roman",
        image: "https://source.unsplash.com/300x300/?roman_blinds",
      },
    ],
    curtain: [
      {
        name: "drape",
        image: "https://source.unsplash.com/300x300/?drape_curtains",
      },
      {
        name: "sheer",
        image: "https://source.unsplash.com/300x300/?sheer_curtains",
      },
    ],
  };

  return (
    <div>
      <UserLayout />

      {/* Header Section */}
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-green-700 mb-3">
          {capitalizeFirstLetter(name)}
        </h2>
        <p className="text-gray-700 mt-2 font-lato">
          Find Your Perfect {capitalizeFirstLetter(name)}
        </p>
      </div>

      {/* Main Content Section */}
      <div className="px-4 sm:px-6 lg:px-24">
        {/* Breadcrumb and Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div className="text-gray-500 mb-4 sm:mb-0 flex font-lato">
            Home / {name}
          </div>

          <div className="flex gap-4">
            {/* Filter Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-green-700 hover:bg-green-50">
                  Filters <ActivityLogIcon />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-4">
                <h3 className="text-lg font-semibold mb-4">Filter Options</h3>
                <FilterDropdown
                  filters={filters}
                  setFilters={setFilters}
                  applyFilters={applyFilters}
                />
              </SheetContent>
            </Sheet>

            {/* Sort Dropdown */}
            <select
              className="border px-4 py-2 rounded-lg text-black hover:bg-green-50 bg-white outline-none"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="latest">Sort by Latest</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>

        {/* Category Images Grid */}
        {categoryImages[name] && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {categoryImages[name].map((item, index) => (
              <div
                key={index}
                className="text-center cursor-pointer"
                onClick={() => handleCategoryClick(item.name)}
              >
                <div className="border-2 border-yellow-500 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <p className="mt-2 text-lg text-green-800">{item.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="px-4 sm:px-6 lg:px-7">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p>Loading products...</p>
          </div>
        ) : productList && productList.length > 0 ? (
          <Productgrid products={productList} />
        ) : (
          <div className="flex justify-center items-center min-h-[200px]">
            <p>No products found</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
      <Bottomfoot />
    </div>
  );
}

export default Layout;
