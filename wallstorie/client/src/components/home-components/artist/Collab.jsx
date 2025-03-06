import { Globe, Handshake, Palette, Receipt } from "lucide-react";
import React from "react";
import {
  FaHammer,
  FaHandshake,
  FaGlobe,
  FaMoneyBillWave,
  FaPaintBrush,
} from "react-icons/fa"; // Example icons from react-icons

const Collab = () => {
  const features = [
    {
      icon: <Palette className="w-12 h-12 text-green-500" />,
      title: "Showcase Your Talent",
      description:
        "Showcase your artwork on premium wallpapers and reach a passionate audience in interior design.",
    },
    {
      icon: <Receipt className="w-12 h-12 text-green-500" />,
      title: " Earn While You Create",
      description:
        "Earn a commission on every wallpaper sale with a clear profit-sharing model.",
    },
    {
      icon: <Globe className="w-12 h-12 text-green-500" />,
      title: "Expand Your Reach",
      description:
        "Gain recognition in interior décor and get featured on our website and social media.",
    },
    {
      icon: <Handshake className="w-12 h-12 text-green-600" />,
      title: "Seamless Process",
      description:
        "Submit your artwork—we handle production, marketing, and sales while you retain ownership rights.",
    },
  ];

  return (
    <div className="py-16 bg-green-50 mt-10 rounded-lg shadow w-3/4 mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-green-700">
          Why Collaborate with WallStorie?
        </h2>
        <p className="text-gray-700 mt-2 font-lato">
          Turn your creativity into stunning wallpapers and earn while you
          inspire!
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
            <p className="text-gray-600 text-sm font-lato">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collab;
