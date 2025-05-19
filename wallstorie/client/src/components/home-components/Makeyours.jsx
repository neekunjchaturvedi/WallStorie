import React from "react";
import galsec from "../../assets/Gallery section.png";

const Makeyours = () => {
  return (
    <div className="relative h-[50vh] w-10/12 max-w-7xl mt-10 mx-auto mb-10 rounded-xl overflow-hidden">
      <img
        src={galsec}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
      />

      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4 md:px-6 lg:px-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Turn Your Memories Into Masterpieces
        </h1>
        <p className="text-sm sm:text-lg md:text-xl text-white mb-6 font-lato">
          Upload your favorite images and transform them into stunning
          wallpapers
        </p>
        <button className="px-4 py-2 sm:px-6 sm:py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition font-lato text-sm sm:text-base">
          Upload Your Image Now!
        </button>
      </div>
    </div>
  );
};

export default Makeyours;
