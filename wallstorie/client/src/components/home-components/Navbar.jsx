import { fetchCartItemCount } from "@/store/shop/cartslice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { itemCount, isLoading } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItemCount(user.id));
    }
  }, [dispatch, user]);

  return (
    <nav className="font-lato flex items-center justify-between w-full max-w-[1169px] h-[80px] mx-auto px-6 rounded-full mb-8 border-2 border-white/50 bg-green-50 shadow-lg backdrop-blur-md relative z-10">
      {/* Hamburger Menu Button */}
      <div className="flex items-center lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[#4a4a4a] text-2xl hover:text-green-700 transition-colors duration-300"
        >
          <i className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>
      </div>

      {/* Logo */}
      <div className="flex items-center cursor-pointer">
        <Link to="/home">
          <img src={logo} alt="Wall Storie" className="h-16 w-auto mr-4" />
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex space-x-6 text-[#4a4a4a] font-medium text-lg">
        <li>
          <Link
            to="/wallpapers"
            className="hover:text-green-700 transition-colors duration-300"
          >
            Wallpapers
          </Link>
        </li>
        <li>
          <Link
            to="/wallpaperrolls"
            className="hover:text-green-700 transition-colors duration-300"
          >
            Wallpaper rolls
          </Link>
        </li>
        <li>
          <Link
            to="/blinds"
            className="hover:text-green-700 transition-colors duration-300"
          >
            Blinds
          </Link>
        </li>
        <li>
          <Link
            to="/artist"
            className="hover:text-green-700 transition-colors duration-300"
          >
            Artist Collection
          </Link>
        </li>
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:text-green-700 transition-colors duration-300">
              Contact Us
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to="/sellart">Sell Art</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/reachout">Reach Out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>

      {/* Right Icons on Larger Screens */}
      <div className="hidden lg:flex items-center space-x-4 text-[#4a4a4a] text-xl w-32 justify-between">
        <Link
          to="/search"
          className="hover:text-green-700 transition-colors duration-300"
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </Link>
        <div className="relative">
          <Link
            to="/cart"
            className="hover:text-green-700 transition-colors duration-300"
          >
            <i className="fa-solid fa-bag-shopping"></i>
          </Link>
          {isAuthenticated && !isLoading && itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {itemCount}
            </span>
          )}
        </div>
        {isAuthenticated ? (
          <Link
            to="/profile"
            className="hover:text-green-700 transition-colors duration-300"
          >
            <i className="fa-solid fa-user"></i>
          </Link>
        ) : (
          <Button
            className="animated-button bg-green-600 hover:bg-green-700"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </Button>
        )}
      </div>

      {/* Left Icons on Small Screens */}
      <div className="flex items-center lg:hidden space-x-4 text-[#4a4a4a] text-xl">
        {isAuthenticated ? (
          <Link
            to="/profile"
            className="hover:text-green-700 transition-colors duration-300"
          >
            <i className="fa-solid fa-user"></i>
          </Link>
        ) : (
          <Button
            className="animated-button bg-green-600 hover:bg-green-700"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </Button>
        )}
        <div className="relative">
          <Link
            to="/cart"
            className="hover:text-green-700 transition-colors duration-300"
          >
            <i className="fa-solid fa-bag-shopping"></i>
          </Link>
          {isAuthenticated && !isLoading && itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {itemCount}
            </span>
          )}
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-green-50 z-50 flex flex-col items-center justify-center space-y-6 text-[#4a4a4a] text-2xl font-medium shadow-lg">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-5 right-5 text-3xl hover:text-green-700"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <Link
            to="/wallpapers"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-green-700 transition-colors duration-300"
          >
            Wallpapers
          </Link>
          <Link
            to="/wallpaperrolls"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-green-700 transition-colors duration-300"
          >
            Wallpaper rolls
          </Link>
          <Link
            to="/blinds"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-green-700 transition-colors duration-300"
          >
            Blinds
          </Link>
          <Link
            to="/artist"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-green-700 transition-colors duration-300"
          >
            Artist Collection
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="hover:text-green-700 transition-colors duration-300">
              Contact Us
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to="/sellart" onClick={() => setIsMenuOpen(false)}>
                  Sell Art
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/reachout" onClick={() => setIsMenuOpen(false)}>
                  Reach Out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="items-center flex space-x-6 text-[#4a4a4a] text-xl">
            <Link
              to="/search"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-green-700 transition-colors duration-300"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
            <div className="relative">
              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-green-700 transition-colors duration-300"
              >
                <i className="fa-solid fa-bag-shopping"></i>
              </Link>
              {isAuthenticated && !isLoading && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </div>
            {isAuthenticated ? (
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-green-700 transition-colors duration-300"
              >
                <i className="fa-solid fa-user"></i>
              </Link>
            ) : (
              <Button
                className="animated-button bg-green-600 hover:bg-green-700"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/auth/login");
                }}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
