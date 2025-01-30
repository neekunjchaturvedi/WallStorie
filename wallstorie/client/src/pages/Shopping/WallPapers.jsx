import UserLayout from "@/components/user/layout";
import Productgrid from "@/components/user/Productgrid";
import { ActivityLogIcon } from "@radix-ui/react-icons";
import React from "react";

const sampleProducts = [
  {
    image1: "https://source.unsplash.com/500x500/?wallpaper,kitchen",
    productName: "Mid-century floral wallpaper",
    price: 120,
    salePrice: 100,
    bestseller: true,
  },
  {
    image1: "https://source.unsplash.com/500x500/?wallpaper,modern",
    productName: "Modern aesthetic wallpaper",
    price: 150,
  },
  {
    image1: "https://source.unsplash.com/500x500/?wallpaper,vintage",
    productName: "Vintage pattern wallpaper",
    price: 200,
    salePrice: 180,
  },
];

function WallPapers() {
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
        <h2 className="text-3xl font-bold text-green-700 mb-3">Wallpaper</h2>
        <p className="text-gray-700 mt-2 font-lato">
          Find Your Perfect Wallpaper
        </p>
      </div>

      <div className="p-24">
        {/* Breadcrumb */}

        {/* Filters & Sorting */}

        <div className="flex justify-between items-center mb-12">
          <div className="text-gray-500 mb-4 flex">Home / Wallpaper</div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-green-700  hover:bg-green-50 ">
              <div className="flex flex-row items-center justify-between w-24 ">
                Filters <ActivityLogIcon />
              </div>
            </button>
            <select className="border px-4 py-2 rounded-lg text-black hover:bg-green-50 bg-white outline-none">
              <option>Sort by Popularity</option>
              <option>Sort by Latest</option>
              <option>Sort by Price</option>
            </select>{" "}
            {/* <div className="flex gap-2">
              <div className="w-10 h-10 border border-green-500 flex items-center justify-center rounded-md cursor-pointer">
                ▦
              </div>
              <div className="w-10 h-10 border border-green-500 flex items-center justify-center rounded-md cursor-pointer">
                ▤
              </div>
            </div> */}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
      </div>
      <Productgrid products={sampleProducts} />
    </div>
  );
}

export default WallPapers;
