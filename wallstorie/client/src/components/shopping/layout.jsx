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
import tropical from "../../assets/productcategories/tropical.png";
import divine from "../../assets/productcategories/divine.png";
import heritage from "../../assets/productcategories/heritage.png";
import kids from "../../assets/productcategories/kids.png";
import roller from "../../assets/productcategories/roller.png";
import roman from "../../assets/productcategories/roman.png";
import drape from "../../assets/productcategories/drape.png";
import sheer from "../../assets/productcategories/sheer.png";
import zebra from "../../assets/productcategories/zebra.png";
import floral from "../../assets/productcategories/floral.jpg";

import {
  getartist,
  getblinds,
  getcur,
  getproductinfo,
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
    color: [],
  });

  const { productList, isLoading, productdetails } = useSelector(
    (state) => state.shopProducts
  );

  const fetchProducts = () => {
    console.log("Fetching products with filters:", filters);
    const options = {
      sortOption,
      filters: {
        price: filters.price,
        color: filters.color,
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
      case "curtain":
        dispatch(getcur(options));
        break;
      case "artist":
        dispatch(getartist(options));
    }
  };
  const handleCategoryClick = (categoryName) => {
    const options = {
      category: categoryName,
      productType: name === "curtain" ? name + "s" : name,
    };

    console.log(options);

    dispatch(getProductsByCategory(options));
  };
  console.log(productList);

  function handlegetdetails(getcurrentid) {
    console.log(getcurrentid);
    dispatch(getproductinfo(getcurrentid));
  }

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
  console.log(productdetails);

  const categoryImages = {
    wallpapers: [
      {
        name: "tropical",
        label: "Tropical",
        image: tropical,
      },
      {
        name: "heritage",
        label: "Heritage",
        image: heritage,
      },
      {
        name: "divine",
        label: "Divine",
        image: divine,
      },
      {
        name: "kidsSeries",
        label: "Kids Series",
        image: kids,
      },
      {
        name: "floral",
        label: "Floral",
        image: floral,
      },
    ],
    blinds: [
      {
        name: "roller",
        label: "Roller",
        image: roller,
      },
      // {
      //   name: "zebra",
      //   label: "Zebra",
      //   image: zebra,
      // },
      // {
      //   name: "roman",
      //   label: "Roman",
      //   image: roman,
      // },
    ],
    curtain: [
      {
        name: "drape",
        label: "Drape",
        image: drape,
      },
      {
        name: "sheer",
        label: "Sheer",
        image: sheer,
      },
    ],
  };

  return (
    <div>
      <UserLayout />

      {/* Header Section */}
      <div className="flex flex-col justify-center items-center">
        {name == "artist" ? (
          <>
            <h2 className="text-3xl font-bold text-green-700 mb-3">
              Artist Collection
            </h2>
            <p className="text-gray-700 mt-2 font-lato mb-3">
              Collaborating with Artists: Bringing Unique Creations to You
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-green-700 mb-3">
              {capitalizeFirstLetter(name)}
            </h2>
            <p className="text-gray-700 mt-2 font-lato mb-3">
              Find Your Perfect {capitalizeFirstLetter(name)}
            </p>
          </>
        )}
      </div>

      {/* Main Content Section */}
      <div className="px-4 sm:px-6 lg:px-24">
        {/* Breadcrumb and Filters */}
        <div className="flex flex-col  sm:flex-row justify-between items-start sm:items-center mb-12">
          <div className="text-gray-500 mb-6 sm:mb-4 font-lato w-full text-left">
            Home / {capitalizeFirstLetter(name)}
          </div>

          <div className="flex  items-center justify-between lg:justify-end gap-4 w-full mx-auto">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 items-center">
            {categoryImages[name].map((item, index) => (
              <div
                key={index}
                className="text-center cursor-pointer flex flex-col justify-center items-center "
                onClick={() => handleCategoryClick(item.name)}
              >
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-contain hover:scale-105 transition-transform"
                  />
                </div>
                <p className="mt-2 text-lg text-green-800">{item.label}</p>
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
          <Productgrid
            products={productList}
            handlegetdetails={handlegetdetails}
          />
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
