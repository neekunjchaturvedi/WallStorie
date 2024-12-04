import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-50  text-white p-4 mt-10 px-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
        <div>
          <img
            src="\src\assets\logo.png"
            alt="Wall Storie Logo"
            className="h-36 mb-4 sm:align-center"
          />
          <p className="text-gray-700">
            Wall Storie offers custom wallpapers, curtains, and blinds to
            transform your space with style and quality.
          </p>
          <div className="flex space-x-4 mt-4  justify-center md:justify-start ">
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

        <div>
          <h4 className="text-lg font-semibold text-green-700 mb-4">
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
                Blinds
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-green-700">
                Curtains
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-green-700 mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-600 hover:text-green-700">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-green-700">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-green-700">
                Privacy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-green-700 mb-4">
            Customer Care
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:care@wallstorie.com"
                className="text-gray-600 hover:text-green-700"
              >
                care@wallstorie.com
              </a>
            </li>
            <li>
              <a
                href="tel:+91798123006"
                className="text-gray-600 hover:text-green-700"
              >
                +91 7981230006
              </a>
            </li>
            <li>
              <span className="text-gray-600">11:00 to 10:30 IST Mon-Sat</span>
            </li>
          </ul>
        </div>
      </div>
      <img
        src="\src\assets\wallpaperimages/footer.png"
        alt="Wall Storie Logo"
        className="h-screen  mb-4 lg:w-full "
      />
      <div className="mt-10 text-center">
        <p className="text-gray-600">
          &copy; 2024 Wall Storie. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
