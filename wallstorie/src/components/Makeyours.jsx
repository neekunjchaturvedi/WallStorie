import React from "react";

const Makeyours = () => {
  return (
    <div className="relative h-[500px] w-[1000px] mt-10 mx-auto mb-10 rounded-xl overflow-hidden">
      {/* Background Image */}
      <img
        src="/src/assets/Gallery section.png" // Replace with your image URL
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Turn Your Memories Into Masterpieces
        </h1>
        <p className="text-lg md:text-xl text-white mb-6 font-lato">
          Upload your favorite images and transform them into stunning
          wallpapers
        </p>
        <button className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition font-lato">
          Upload Your Image Now!
        </button>
      </div>
    </div>
  );
};

export default Makeyours;
