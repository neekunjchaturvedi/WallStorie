import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="font-lato flex items-center justify-between w-full max-w-[1169px] h-[80px] mx-auto px-6 rounded-full mb-8 border-2 border-white/50 bg-green-50 shadow-lg backdrop-blur-md relative z-10">
      {/* Hamburger Menu Button */}
      <div className="flex items-center md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[#4a4a4a] text-2xl hover:text-green-700 transition-colors duration-300"
        >
          <i className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>
      </div>
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="/src/assets/logo.png"
          alt="Wall Storie"
          className="h-16 w-auto mr-4"
        />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-8 text-[#4a4a4a] font-medium text-lg">
        <li>
          <a
            href="#"
            className="hover:text-green-700 transition-colors duration-300"
          >
            Wallpapers
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:text-green-700 transition-colors duration-300"
          >
            Wallpaper rolls
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:text-green-700 transition-colors duration-300"
          >
            Blinds
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:text-green-700 transition-colors duration-300"
          >
            Curtain
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:text-green-700 transition-colors duration-300"
          >
            Contact us
          </a>
        </li>
      </ul>

      {/* Right Icons on Larger Screens */}
      <div className="hidden md:flex items-center space-x-4 text-[#4a4a4a] text-xl">
        <button className="hover:text-green-700 transition-colors duration-300">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <button className="hover:text-green-700 transition-colors duration-300">
          <i className="fa-solid fa-bag-shopping"></i>
        </button>
        <button className="hover:text-green-700 transition-colors duration-300">
          <i className="fa-solid fa-user"></i>
        </button>
      </div>

      {/* Left Icons on Small Screens */}
      <div className="flex items-center md:hidden space-x-4 text-[#4a4a4a] text-xl">
        <button className="hover:text-green-700 transition-colors duration-300">
          <i className="fa-solid fa-user"></i>
        </button>
      </div>

      {/* Mobile Layout (Overlay Menu) */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-green-50 z-50 flex flex-col items-center justify-center space-y-6 text-[#4a4a4a] text-2xl font-medium shadow-lg">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-5 right-5 text-3xl hover:text-green-700"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <a
            href="#"
            className="hover:text-green-700 transition-colors duration-300"
          >
            Wallpapers
          </a>
          <a
            href="#"
            className="hover:text-green-700 transition-colors duration-300"
          >
            Wallpaper rolls
          </a>
          <a
            href="#"
            className="hover:text-green-700 transition-colors duration-300"
          >
            Blinds
          </a>
          <a
            href="#"
            className="hover:text-green-700 transition-colors duration-300"
          >
            Curtain
          </a>
          <a
            href="#"
            className="hover:text-green-700 transition-colors duration-300"
          >
            Contact us
          </a>
          <div className="items-center space-x-6 text-[#4a4a4a] text-xl">
            <button className="hover:text-green-700 transition-colors duration-300">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <button className="hover:text-green-700 transition-colors duration-300">
              <i className="fa-solid fa-bag-shopping"></i>
            </button>
            <button className="hover:text-green-700 transition-colors duration-300">
              <i className="fa-solid fa-user"></i>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
