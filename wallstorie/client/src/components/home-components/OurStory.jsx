import React from "react";

const OurStory = () => {
  return (
    <div className="bg-white rounded-xl p-10 max-w-7xl mx-auto flex flex-col md:flex-row mt-7">
      <div
        className="md:w-1/2 bg-cover bg-center rounded-l-xl"
        style={{ backgroundImage: 'url("/src/assets/storysection.jpg")' }}
      >
        <div className="p-8 md:p-12 h-full flex flex-col justify-start">
          <h1 className="text-5xl font-bold text-white leading-tight flex">
            OUR STORY
          </h1>
          <p className="text-white italic mt-4 text-lg flex">
            Where it all began
          </p>
        </div>
      </div>

      <div className="md:w-1/2 bg-gradient-to-r from-white to-green-50 rounded-r-xl p-8 md:p-12 flex flex-col justify-center">
        <blockquote className="text-gray-700 text-lg italic mb-6">
          “Our journey started with a simple idea—to transform walls into
          stories and expressions of individuality. With years of experience and
          an eye for design, we’ve grown into a trusted partner that brings your
          spaces to life through innovative wallpapers.”
        </blockquote>

        <div className="flex justify-around mt-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">5000+</p>
            <p className="text-sm text-gray-600">satisfied clients</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">100+</p>
            <p className="text-sm text-gray-600">unique styles</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">4+</p>
            <p className="text-sm text-gray-600">years of experience</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
