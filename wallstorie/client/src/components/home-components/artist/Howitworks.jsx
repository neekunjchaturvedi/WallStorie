import React from "react";
import { FaRegPaperPlane, FaLightbulb, FaCheckCircle } from "react-icons/fa";

const Howitworks = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between w-1/2 gap-8 bg-white p-8 rounded-lg mt-20 mb-20 mx-auto">
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
        <div className="text-left mb-10">
          <h2 className="text-3xl font-bold text-green-700 ">How It Works:</h2>
          <span className="font-lato text-3xl text-green-700">
            From Canvas to Wall
          </span>
        </div>
        <div className="flex items-start mb-12 font-lato">
          <FaRegPaperPlane className="text-green-600 text-3xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 text-start">
              Submit Your Artwork
            </h3>
            <p className="text-gray-600 text-start">
              Submit your high-resolution artwork through contacting us. Make
              sure it meets our design and quality guidelines.
            </p>
          </div>
        </div>
        <div className="flex items-start mb-12 font-lato">
          <FaLightbulb className="text-green-600 text-3xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 text-start">
              Approval & Collaboration
            </h3>
            <p className="text-gray-600 text-start ">
              Our team will review your submission. Once approved, we’ll discuss
              licensing terms and commission details.
            </p>
          </div>
        </div>
        <div className="flex items-start font-lato mb-8">
          <FaCheckCircle className="text-green-600 text-3xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 text-start">
              Sell & Earn
            </h3>
            <p className="text-gray-600 text-start">
              Your artwork is transformed into stunning wallpapers, and you earn
              a commission on every sale!
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:flex w-full md:w-1/2 mx-auto justify-center">
        <img
          src="./src/assets/artistwall.png"
          alt="Consultation"
          className="rounded-lg shadow-md w-[400px] h-[400px]"
        />
      </div>
    </div>
  );
};

export default Howitworks;
