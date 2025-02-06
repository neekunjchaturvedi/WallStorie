import UserLayout from "@/components/user/layout";
import Productgrid from "@/components/user/Productgrid";
import { ActivityLogIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import FilterDropdown from "@/components/shopping/filterdropdown";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getblinds,
  getcur,
  getWallpaper,
  getWallpaperrolls,
} from "@/store/shop/productslice";
import Footer from "../home-components/Footer";
import { Bottomfoot } from "../home-components/Bottomfoot";

function capitalizeFirstLetter(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Layout() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const name = pathSegments[pathSegments.length - 1];
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState("popularity");

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);

  useEffect(() => {
    if (name === "wallpapers") {
      dispatch(getWallpaper(sortOption));
    } else if (name === "wallpaperrolls") {
      dispatch(getWallpaperrolls(sortOption));
    } else if (name === "blinds") {
      dispatch(getblinds(sortOption));
    } else {
      dispatch(getcur(sortOption));
    }
  }, [dispatch, name, sortOption]);

  console.log(productList);

  const wallpapers = [
    {
      name: "Tropical",
      image: "https://source.unsplash.com/300x300/?tropical",
    },
    {
      name: "Heritage",
      image: "https://source.unsplash.com/300x300/?heritage",
    },
    { name: "Divine", image: "https://source.unsplash.com/300x300/?ganesha" },
    { name: "Kids series", image: "https://source.unsplash.com/300x300/?kids" },
  ];

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

      <div className="px-24">
        {/* Breadcrumb */}
        {/* Filters & Sorting */}
        <div className="flex justify-between items-center mb-12">
          <div className="text-gray-500 mb-4 flex font-lato">Home / {name}</div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-green-700 hover:bg-green-50">
              <div className="relative">
                {/* Filter Button */}
                <div
                  className="flex flex-row items-center justify-between w-24 p-2 rounded-md cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Filters <ActivityLogIcon />
                </div>

                {isOpen && (
                  <div className="absolute mt-2 left-0 z-50 bg-white shadow-lg rounded-lg border p-4 w-72">
                    <FilterDropdown />
                  </div>
                )}
              </div>
            </button>
            <select
              className="border px-4 py-2 rounded-lg text-black hover:bg-green-50 bg-white outline-none"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="latest">Sort by Latest</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>

        {name === "wallpapers" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {wallpapers.map((wallpaper, index) => (
              <div key={index} className="text-center">
                <div className="border-2 border-yellow-500 rounded-lg overflow-hidden">
                  <img
                    src={wallpaper.image}
                    alt={wallpaper.name}
                    className="w-10/12 h-56 object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <p className="mt-2 text-lg text-green-800">{wallpaper.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="px-7">
        <Productgrid products={productList} />
      </div>
      <Footer />
      <Bottomfoot />
    </div>
  );
}

export default Layout;
