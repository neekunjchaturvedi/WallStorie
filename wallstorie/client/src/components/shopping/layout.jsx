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
    colors: [],
    spaces: [],
    trends: [],
  });

  const { productList, isLoading } = useSelector((state) => state.shopProducts);

  const fetchProducts = () => {
    const queryParams = {
      sortOption,
      filters: {
        price: filters.price,
        colors: filters.colors.join(","),
        spaces: filters.spaces.join(","),
        trends: filters.trends.join(","),
      },
    };

    switch (name) {
      case "wallpapers":
        dispatch(getWallpaper(queryParams));
        break;
      case "wallpaperrolls":
        dispatch(getWallpaperrolls(queryParams));
        break;
      case "blinds":
        dispatch(getblinds(queryParams));
        break;
      default:
        dispatch(getcur(queryParams));
        break;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [dispatch, name, sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const applyFilters = () => {
    fetchProducts();
  };

  const categoryImages = {
    wallpapers: [
      {
        name: "Tropical",
        image: "https://source.unsplash.com/300x300/?tropical",
      },
      {
        name: "Heritage",
        image: "https://source.unsplash.com/300x300/?heritage",
      },
      { name: "Divine", image: "https://source.unsplash.com/300x300/?ganesha" },
      {
        name: "Kids series",
        image: "https://source.unsplash.com/300x300/?kids",
      },
    ],
    blinds: [
      {
        name: "Roller",
        image: "https://source.unsplash.com/300x300/?roller_blinds",
      },
      {
        name: "Zebra",
        image: "https://source.unsplash.com/300x300/?zebra_blinds",
      },
      {
        name: "Roman",
        image: "https://source.unsplash.com/300x300/?roman_blinds",
      },
    ],
    curtains: [
      {
        name: "Drape",
        image: "https://source.unsplash.com/300x300/?drape_curtains",
      },
      {
        name: "Sheer",
        image: "https://source.unsplash.com/300x300/?sheer_curtains",
      },
    ],
  };

  return (
    <div>
      <UserLayout />
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-green-700 mb-3">
          {capitalizeFirstLetter(name)}
        </h2>
        <p className="text-gray-700 mt-2 font-lato">
          Find Your Perfect {capitalizeFirstLetter(name)}
        </p>
      </div>

      <div className="px-4 sm:px-6 lg:px-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div className="text-gray-500 mb-4 sm:mb-0 flex font-lato">
            Home / {name}
          </div>
          <div className="flex gap-4">
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

        {categoryImages[name] && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {categoryImages[name].map((item, index) => (
              <div key={index} className="text-center">
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

      <div className="px-4 sm:px-6 lg:px-7">
        {isLoading ? (
          <div>Loading products...</div>
        ) : (
          <Productgrid products={productList} />
        )}
      </div>

      <Footer />
      <Bottomfoot />
    </div>
  );
}

export default Layout;
