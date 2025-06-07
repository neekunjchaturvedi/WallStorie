import React from "react";
import { FaHammer, FaMagic, FaShieldAlt, FaHandshake } from "react-icons/fa"; // Example icons from react-icons

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaHammer size={30} className="text-green-600" />,
      title: "Expert Craftsmanship",
      description: "Our skilled artists combine creativity with precision.",
    },
    {
      icon: <FaMagic size={30} className="text-green-600" />,
      title: "Customizable Designs",
      description:
        "Personalize your space with designs tailored to your unique style and preferences.",
    },
    {
      icon: <FaShieldAlt size={30} className="text-green-600" />,
      title: "High-Quality Materials",
      description:
        "Made with premium, eco-friendly materials for durability and safety.",
    },
    {
      icon: <FaHandshake size={30} className="text-green-600" />,
      title: "Seamless Experience",
      description:
        "From browsing to installation, we ensure a smooth and hassle-free journey for every customer.",
    },
  ];

  return (
    <div className="py-16 bg-green-50 mt-10 rounded-lg shadow w-3/4 mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-green-700">Why Choose Us?</h2>
        <p className="text-gray-700 mt-2 font-lato">
          Discover why we're trusted by homeowners and designers alike.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 lg:px-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-green-50 p-6 rounded-lg shadow-lg text-center flex flex-col items-center sm:space-y-4 "
          >
            <div className="flex justify-center items-center bg-green-100 p-4 rounded-full">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-green-700">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm font-lato hidden lg:block">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
