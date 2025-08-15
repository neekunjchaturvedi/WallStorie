import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
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
import drape from "../../assets/productcategories/drape.png";
import sheer from "../../assets/productcategories/sheer.png";
import floral from "../../assets/productcategories/floral.jpg";
import bestseller from "../../assets/productcategories/bestseller.jpg";
import artistcollection from "../../assets/productcategories/artistcollection.jpg";

import {
  useLazyGetWallpapersQuery,
  useLazyGetWallpaperRollsQuery,
  useLazyGetBlindsQuery,
  useLazyGetCurtainsQuery,
  useLazyGetArtistCollectionQuery,
  useLazyGetProductsByCategoryQuery,
  useGetProductDetailsQuery,
} from "@/store/shop/productslice";

// Import SEO component
import SEO from "@/components/common/SEO";

function capitalizeFirstLetter(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Layout() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const name = pathSegments[pathSegments.length - 1];

  const [sortOption, setSortOption] = useState("popularity");
  const [filters, setFilters] = useState({
    price: "0",
    space: [],
    trends: [],
    color: [],
  });
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isShowingCategory, setIsShowingCategory] = useState(false);

  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const PRODUCTS_PER_PAGE = 25;

  const [
    getWallpapers,
    { data: wallpapersData, isLoading: wallpapersLoading },
  ] = useLazyGetWallpapersQuery();
  const [getWallpaperRolls, { data: rollsData, isLoading: rollsLoading }] =
    useLazyGetWallpaperRollsQuery();
  const [getBlinds, { data: blindsData, isLoading: blindsLoading }] =
    useLazyGetBlindsQuery();
  const [getCurtains, { data: curtainsData, isLoading: curtainsLoading }] =
    useLazyGetCurtainsQuery();
  const [getArtistCollection, { data: artistData, isLoading: artistLoading }] =
    useLazyGetArtistCollectionQuery();
  const [
    getProductsByCategory,
    { data: categoryData, isLoading: categoryLoading },
  ] = useLazyGetProductsByCategoryQuery();

  const { data: productDetails } = useGetProductDetailsQuery(
    selectedProductId,
    {
      skip: !selectedProductId,
    }
  );

  const queryOptions = useMemo(
    () => ({
      sortOption,
      filters: {
        price: filters.price,
        color: filters.color,
        space: filters.space,
        trends: filters.trends,
      },
    }),
    [sortOption, filters]
  );

  const getCurrentData = () => {
    if (isShowingCategory) {
      return { data: categoryData, isLoading: categoryLoading };
    }
    switch (name) {
      case "wallpapers":
        return { data: wallpapersData, isLoading: wallpapersLoading };
      case "wallpaperrolls":
        return { data: rollsData, isLoading: rollsLoading };
      case "blinds":
        return { data: blindsData, isLoading: blindsLoading };
      case "curtain":
        return { data: curtainsData, isLoading: curtainsLoading };
      case "artist":
        return { data: artistData, isLoading: artistLoading };
      default:
        return { data: null, isLoading: false };
    }
  };

  const { data: productList, isLoading } = getCurrentData();

  const fetchProducts = () => {
    setIsShowingCategory(false);
    setSelectedCategory(null);
    switch (name) {
      case "wallpapers":
        getWallpapers(queryOptions);
        break;
      case "wallpaperrolls":
        getWallpaperRolls(queryOptions);
        break;
      case "blinds":
        getBlinds(queryOptions);
        break;
      case "curtain":
        getCurtains(queryOptions);
        break;
      case "artist":
        getArtistCollection(queryOptions);
        break;
    }
  };

  const handleCategoryClick = (categoryName) => {
    const options = {
      category: categoryName,
      productType: name === "curtain" ? name + "s" : name,
      sortOption: queryOptions.sortOption,
      filters: queryOptions.filters,
    };
    setSelectedCategory(categoryName);
    setIsShowingCategory(true);
    getProductsByCategory(options);
  };

  const handleBackToMainCategory = () => {
    setIsShowingCategory(false);
    setSelectedCategory(null);
    fetchProducts();
  };

  const handleBackToCategory = () => {
    const options = {
      category: categoryName,
      productType: name === "curtain" ? name + "s" : name,
      sortOption: queryOptions.sortOption,
      filters: queryOptions.filters,
    };
    getProductsByCategory(options);
    setIsShowingCategory(false);
    setSelectedCategory(null);
  };

  function handlegetdetails(getcurrentid) {
    setSelectedProductId(getcurrentid);
  }

  useEffect(() => {
    if (productList && productList.length > 0) {
      setCurrentPage(1);
      setDisplayedProducts(productList.slice(0, PRODUCTS_PER_PAGE));
    } else {
      setDisplayedProducts([]);
    }
  }, [productList]);

  useEffect(() => {
    setIsShowingCategory(false);
    setSelectedCategory(null);
    fetchProducts();
  }, [name, sortOption]);

  useEffect(() => {
    if (isShowingCategory && selectedCategory) {
      handleCategoryClick(selectedCategory);
    } else {
      fetchProducts();
    }
  }, [filters]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const applyFilters = () => {};

  const loadMoreProducts = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = currentPage * PRODUCTS_PER_PAGE;
      const endIndex = startIndex + PRODUCTS_PER_PAGE;
      const newProducts = productList.slice(startIndex, endIndex);
      setDisplayedProducts((prev) => [...prev, ...newProducts]);
      setCurrentPage(nextPage);
      setIsLoadingMore(false);
    }, 500);
  };

  const hasMoreProducts =
    productList && displayedProducts.length < productList.length;

  const categoryImages = {
    wallpapers: [
      { name: "bestseller", label: "Bestseller", image: bestseller },
      {
        name: "artistCollection",
        label: "Artist Collection",
        image: artistcollection,
      },
      { name: "tropical", label: "Tropical", image: tropical },
      { name: "heritage", label: "Heritage", image: heritage },
      { name: "divine", label: "Divine", image: divine },
      { name: "floral", label: "Floral", image: floral },
      { name: "kidsSeries", label: "Kids Series", image: kids },
    ],
    blinds: [{ name: "roller", label: "Roller", image: roller }],
    curtain: [
      { name: "drape", label: "Drape", image: drape },
      { name: "sheer", label: "Sheer", image: sheer },
    ],
  };

  // -----------------
  // Dynamic SEO Setup
  // -----------------
  const pageTitle = `${capitalizeFirstLetter(name)}${
    selectedCategory ? ` - ${capitalizeFirstLetter(selectedCategory)}` : ""
  } | WallStorie`;
  const pageDescription = `Explore our collection of ${capitalizeFirstLetter(
    name
  )}${
    selectedCategory
      ? ` in ${capitalizeFirstLetter(selectedCategory)} category`
      : ""
  } at WallStorie. Premium designs, fast delivery, and easy installation in India.`;
  const canonicalUrl = `https://www.wallstorie.in/${name}${
    selectedCategory ? `/${selectedCategory}` : ""
  }`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "WallStorie",
    url: canonicalUrl,
    logo: "https://www.wallstorie.in/images/logo.png",
    image: "https://www.wallstorie.in/images/og-image.png",
    description: pageDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "1st floor, Hanuman plywood complex, Beside PSR Convention centre, Kompally, Hyderabad-500014",
      addressCountry: "IN",
    },
  };

  return (
    <div>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={`${name}, ${
          selectedCategory || ""
        }, wallpapers, wall decor, home decoration`}
        image="https://www.wallstorie.in/images/og-image.png"
        url={canonicalUrl}
        schema={schemaData}
      />

      <UserLayout />

      {/* Header Section */}
      <div className="flex flex-col justify-center items-center">
        {name === "artist" ? (
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
              {isShowingCategory && selectedCategory && (
                <span className="text-xl text-gray-600 ml-2">
                  - {capitalizeFirstLetter(selectedCategory)}
                </span>
              )}
            </h2>
            <p className="text-gray-700 mt-2 font-lato mb-3">
              Find Your Perfect {capitalizeFirstLetter(name)}
              {isShowingCategory && selectedCategory && (
                <span>
                  {" "}
                  in {capitalizeFirstLetter(selectedCategory)} category
                </span>
              )}
            </p>
          </>
        )}
      </div>

      {/* Main Content Section */}
      <div className="px-4 sm:px-6 lg:px-24">
        {/* Breadcrumb and Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div className="text-gray-500 mb-6 sm:mb-4 font-lato w-full text-left">
            Home / {capitalizeFirstLetter(name)}
            {isShowingCategory && selectedCategory && (
              <>
                {" / "}
                <button
                  onClick={handleBackToCategory}
                  className="text-green-600 hover:underline"
                >
                  {capitalizeFirstLetter(selectedCategory)}
                </button>
              </>
            )}
            {isShowingCategory && (
              <button
                onClick={handleBackToMainCategory}
                className="ml-4 text-green-600 hover:underline text-sm"
              >
                ← Back to all {capitalizeFirstLetter(name)}
              </button>
            )}
          </div>

          <div className="flex items-center justify-between lg:justify-end gap-4 w-full mx-auto">
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

        {/* Category Images Grid - Only show when not viewing category results */}
        {!isShowingCategory && categoryImages[name] && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 items-center">
            {categoryImages[name].map((item, index) => (
              <div
                key={index}
                className="text-center cursor-pointer flex flex-col justify-center items-center"
                onClick={() => handleCategoryClick(item.name)}
              >
                <div className="rounded-full overflow-hidden">
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
        ) : displayedProducts && displayedProducts.length > 0 ? (
          <>
            <Productgrid
              products={displayedProducts}
              handlegetdetails={handlegetdetails}
            />

            {/* Load More Button */}
            {hasMoreProducts && (
              <div className="flex justify-center mt-8 mb-8">
                <button
                  onClick={loadMoreProducts}
                  disabled={isLoadingMore}
                  className="bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  {isLoadingMore ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Loading...
                    </>
                  ) : (
                    `Load More Products (${
                      productList.length - displayedProducts.length
                    } remaining)`
                  )}
                </button>
              </div>
            )}

            {/* Products count indicator */}
            <div className="text-center text-gray-600 mb-6">
              Showing {displayedProducts.length} of {productList?.length || 0}{" "}
              products
              {isShowingCategory && selectedCategory && (
                <span>
                  {" "}
                  in {capitalizeFirstLetter(selectedCategory)} category
                </span>
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center min-h-[200px]">
            <p>
              No products found
              {isShowingCategory && selectedCategory && (
                <span>
                  {" "}
                  in {capitalizeFirstLetter(selectedCategory)} category
                </span>
              )}
            </p>
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
