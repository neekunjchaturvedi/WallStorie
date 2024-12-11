import React from "react";
import { FaRegPaperPlane, FaLightbulb, FaCheckCircle } from "react-icons/fa";

const SchedulingSection = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-3/4 bg-white shadow-lg p-8 rounded-lg mt-20 mb-20 mx-auto">
      {/* Text Section */}
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
        <h2 className="text-3xl font-bold text-green-700 mb-6 ">
          Book Your Personalized Consultation
        </h2>
        <div className="flex items-start mb-6">
          <FaRegPaperPlane className="text-green-600 text-2xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 text-start">
              Share Your Preferences
            </h3>
            <p className="text-gray-600 text-start">
              Let us know your style, needs, and space requirements by filling
              out a quick form or talking to our expert.
            </p>
          </div>
        </div>
        <div className="flex items-start mb-6">
          <FaLightbulb className="text-green-600 text-2xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 text-start">
              Get Expert Advice
            </h3>
            <p className="text-gray-600 text-start">
              Our design specialists will provide tailored recommendations to
              suit your home's unique aesthetic.
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <FaCheckCircle className="text-green-600 text-2xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 text-start">
              Confirm Your Booking
            </h3>
            <p className="text-gray-600 text-start">
              Schedule your consultation at your convenience and take the first
              step toward transforming your space.
            </p>
          </div>
        </div>
        <button className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
          Schedule Now
        </button>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-1/2 mx-auto flex  justify-center ">
        <img
          src="https://via.placeholder.com/400" // Replace this with your image source
          alt="Consultation"
          className="rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default SchedulingSection;
