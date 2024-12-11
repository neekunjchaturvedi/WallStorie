import React from "react";

const Navbar = () => {
  return (
    <nav className="font-lato flex items-center justify-between w-full max-w-[1169px] h-[80px] mx-auto px-6 rounded-full mb-8 border-2 border-white/50 bg-green-50 shadow-lg backdrop-blur-md ">
      <div className="flex items-center">
        <img
          src="\src\assets\logo.png"
          alt="Wall Storie"
          className="h-24 w-auto mr-4"
        />
      </div>

      <ul className="flex space-x-8 text-[#4a4a4a] font-medium text-lg">
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

      <div className="flex items-center space-x-6 text-[#4a4a4a] text-xl">
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
    </nav>
  );
};

export default Navbar;
