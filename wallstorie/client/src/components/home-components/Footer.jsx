import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-50 text-white p-4 mt-10 px-10 font-lato w-full">
      <div className="lg:h-[270px] sm:h-[800px] max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        <div>
          <img
            src="/src/assets/logo.png"
            alt="Wall Storie Logo"
            className="h-36 mb-4 items-center"
          />
          <p className="text-gray-700 text-left font-lato">
            Wall Storie offers custom wallpapers, curtains, and blinds to
            transform your space with style and quality.
          </p>
          <div className="flex space-x-4 mt-4 justify-center md:justify-start">
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-600 hover:text-green-700"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-600 hover:text-green-700"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-600 hover:text-green-700"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-gray-600 hover:text-green-700"
            >
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-x-64">
          <div className="mb-10">
            <h4 className="text-lg font-semibold text-green-700 mb-4 whitespace-nowrap">
              Our Services
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-green-700">
                  Wallpaper
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-700">
                  Wallpaper Rolls
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-700">
                  Blinds
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-700">
                  Curtains
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-700">
                  Artiste
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-10">
            <h4 className="text-lg font-semibold text-green-700 mb-4 whitespace-nowrap">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-green-700 whitespace-nowrap"
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-green-700 whitespace-nowrap"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-green-700 whitespace-nowrap"
                >
                  Privacy
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-10">
            <h4 className="text-lg font-semibold text-green-700 mb-4 whitespace-nowrap">
              Customer Care
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:care@wallstorie.com"
                  className="text-gray-600 hover:text-green-700 whitespace-nowrap"
                >
                  care@wallstorie.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+91798123006"
                  className="text-gray-600 hover:text-green-700 whitespace-nowrap"
                >
                  +91 7981230006
                </a>
              </li>
              <li>
                <span className="text-gray-600 whitespace-nowrap">
                  11:00 to 10:30 IST Mon-Sat
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4  ">
        <img src="/src/assets/footerimg.png" alt="" />
      </div>
    </footer>
  );
};

export default Footer;
