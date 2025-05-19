import React from "react";
import { useNavigate } from "react-router-dom";
import wallpaper from "../../assets/wallpaperimages/collection1.png";
import wallpaperroll from "../../assets/wallpaperimages/collection2.png";
import blinds from "../../assets/wallpaperimages/collection3.png";
import curtain from "../../assets/wallpaperimages/collection4.png";
const OurCollections = () => {
  const navigate = useNavigate();

  const collections = [
    {
      name: "Wallpaper",
      image: wallpaper,
      link: "/wallpapers",
    },
    {
      name: "Wallpaper Roll",
      image: wallpaperroll,
      link: "/wallpaperrolls",
    },
    {
      name: "Blinds",
      image: blinds,
      link: "/blinds",
    },
    {
      name: "Curtains",
      image: curtain,
      link: "/curtain",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-green-700">Our Collections</h2>
        <p className="text-gray-700 mt-2 font-lato">
          Tailored Services to Elevate Your Space
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {collections.map((collection, index) => (
          <div
            key={index}
            className="text-center"
            onClick={() => {
              navigate(collection.link);
            }}
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg mx-auto mb-4">
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-medium text-green-700 font-lato">
              {collection.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurCollections;
