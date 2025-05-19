import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import footerimg from "../../assets/footerimg.png";

const Footer = () => {
  const nav = useNavigate();
  return (
    <footer className="bg-green-50 text-white p-4 mt-10 px-10 font-lato w-full">
      <div className="lg:h-[270px] sm:h-[800px] max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        <div>
          <img
            src={logo}
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
                <a
                  className="text-gray-600 hover:text-green-700 cursor-pointer"
                  onClick={() => {
                    nav("/wallpapers");
                  }}
                >
                  Wallpaper
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    nav("/wallpaperrolls");
                  }}
                  className="text-gray-600 hover:text-green-700 cursor-pointer"
                >
                  WallpaperRolls
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    nav("/blinds");
                  }}
                  className="text-gray-600 hover:text-green-700 cursor-pointer"
                >
                  Blinds
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    nav("/curtain");
                  }}
                  className="text-gray-600 hover:text-green-700 cursor-pointer"
                >
                  Curtains
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    nav("/artist");
                  }}
                  className="text-gray-600 hover:text-green-700 cursor-pointer"
                >
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
                  onClick={() => {
                    nav("/shipping");
                  }}
                  className="text-gray-600 hover:text-green-700 whitespace-nowrap cursor-pointer"
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    nav("/terms");
                  }}
                  className="text-gray-600 hover:text-green-700 whitespace-nowrap cursor-pointer"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  className="text-gray-600 hover:text-green-700 whitespace-nowrap cursor-pointer"
                  onClick={() => {
                    nav("/privacy");
                  }}
                >
                  Privacy
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-10 md:w-48 md:text-left ">
            <h4 className="text-lg font-semibold text-green-700 mb-4 whitespace-nowrap">
              Customer Care
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:care@wallstorie.com"
                  className="text-gray-600 hover:text-green-700 whitespace-nowrap"
                >
                  contact@wallstorie.in
                </a>
              </li>
              <li>
                <a
                  href="tel:+916302644520"
                  className="text-gray-600 hover:text-green-700 whitespace-nowrap"
                >
                  +91 6302644520
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/cJ7LLnRjDV5qVK6t5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-700 whitespace-normal block"
                >
                  1st floor, Hanuman plywood complex, Beside PSR Convention
                  centre, Kompally, Hyderabad-500014
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4  ">
        <img src={footerimg} alt="footerimg" />
      </div>
    </footer>
  );
};

export default Footer;
