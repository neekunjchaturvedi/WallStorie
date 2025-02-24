import { fetchCartItemCount } from "@/store/shop/cartslice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledWrapper = styled.div`
  .animated-button {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    border: none;
    font-size: 14px;
    background-color: #43a047;
    border-radius: 20px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
  }

  .animated-button:hover {
    background-color: #558b6e;
  }

  .animated-button:active {
    transform: scale(0.95);
  }
`;

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
    <nav className="font-lato flex items-center justify-between w-full max-w-[1169px] h-[80px] mx-auto px-6 rounded-full mb-8 border-2 border-white/50 bg-green-50 shadow-lg backdrop-blur-md relative z-10 fixed">
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
      <div className="flex items-center cursor-pointer">
        <img
          onClick={() => {
            return navigate("/home");
          }}
          src="/src/assets/logo.png"
          alt="Wall Storie"
          className="h-16 w-auto mr-4"
        />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-8 text-[#4a4a4a] font-medium text-lg">
        <li>
          <a
            onClick={() => {
              return navigate("/wallpapers");
            }}
            className="hover:text-green-700 transition-colors duration-300 cursor-pointer"
          >
            Wallpapers
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              return navigate("/wallpaperrolls");
            }}
            className="hover:text-green-700 transition-colors duration-300 cursor-pointer"
          >
            Wallpaper rolls
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              return navigate("/blinds");
            }}
            className="hover:text-green-700 transition-colors duration-300 cursor-pointer"
          >
            Blinds
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              return navigate("/curtain");
            }}
            className="hover:text-green-700 transition-colors duration-300 cursor-pointer"
          >
            Curtain
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              return navigate("/artist");
            }}
            className="hover:text-green-700 transition-colors duration-300 cursor-pointer"
          >
            Artist Collection
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              return navigate("/contact");
            }}
            className="hover:text-green-700 transition-colors duration-300 cursor-pointer"
          >
            Contact us
          </a>
        </li>
      </ul>

      {/* Right Icons on Larger Screens */}
      <div className="hidden md:flex items-center space-x-4 text-[#4a4a4a] text-xl w-32 justify-between">
        <button className="hover:text-green-700 transition-colors duration-300">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <div className="relative">
          <button
            className="hover:text-green-700 transition-colors duration-300"
            onClick={() => {
              return navigate("/cart");
            }}
          >
            <i className="fa-solid fa-bag-shopping"></i>
          </button>
          {isAuthenticated && !isLoading && itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {itemCount}
            </span>
          )}
        </div>
        {isAuthenticated ? (
          <button
            className="hover:text-green-700 transition-colors duration-300"
            onClick={() => {
              return navigate("/profile");
            }}
          >
            <i className="fa-solid fa-user"></i>
          </button>
        ) : (
          <StyledWrapper>
            <button
              className="animated-button"
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              Login
            </button>
          </StyledWrapper>
        )}
      </div>

      {/* Left Icons on Small Screens */}
      <div className="flex items-center md:hidden space-x-4 text-[#4a4a4a] text-xl">
        {isAuthenticated ? (
          <button
            className="hover:text-green-700 transition-colors duration-300"
            onClick={() => {
              return navigate("/profile");
            }}
          >
            <i className="fa-solid fa-user"></i>
          </button>
        ) : (
          <StyledWrapper>
            <button
              className="animated-button"
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              Login
            </button>
          </StyledWrapper>
        )}
        <div className="relative">
          <button
            className="hover:text-green-700 transition-colors duration-300"
            onClick={() => {
              return navigate("/cart");
            }}
          >
            <i className="fa-solid fa-bag-shopping"></i>
          </button>
          {isAuthenticated && !isLoading && itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {itemCount}
            </span>
          )}
        </div>
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
            onClick={() => {
              return navigate("/wallpapers");
            }}
            className="hover:text-green-700 transition-colors duration-300 cursor-pointer"
          >
            Wallpapers
          </a>
          <a
            onClick={() => {
              return navigate("/wallpaperrolls");
            }}
            className="hover:text-green-700 transition-colors duration-300 cursor-pointer"
          >
            Wallpaper rolls
          </a>
          <a
            onClick={() => {
              return navigate("/blinds");
            }}
            className="hover:text-green-700 transition-colors duration-300 cursor-pointer"
          >
            Blinds
          </a>
          <a
            onClick={() => {
              return navigate("/curtain");
            }}
            className="hover:text-green-700 transition-colors duration-300 cursor-pointer"
          >
            Curtain
          </a>

          <a
            onClick={() => {
              return navigate("/artist");
            }}
            className="hover:text-green-700 transition-colors duration-300 cursor-pointer"
          >
            Artist Collection
          </a>

          <a
            href="#"
            className="hover:text-green-700 transition-colors duration-300 cursor-pointer"
          >
            Contact us
          </a>
          <div className="items-center flex space-x-6 text-[#4a4a4a] text-xl">
            <button className="hover:text-green-700 transition-colors duration-300">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <div className="relative">
              <button
                className="hover:text-green-700 transition-colors duration-300"
                onClick={() => {
                  return navigate("/cart");
                }}
              >
                <i className="fa-solid fa-bag-shopping"></i>
              </button>
              {isAuthenticated && !isLoading && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </div>
            {isAuthenticated ? (
              <button
                className="hover:text-green-700 transition-colors duration-300"
                onClick={() => {
                  return navigate("/cart");
                }}
              >
                <i className="fa-solid fa-user"></i>
              </button>
            ) : (
              <StyledWrapper>
                <button
                  className="animated-button"
                  onClick={() => {
                    navigate("/auth/login");
                  }}
                >
                  Login
                </button>
              </StyledWrapper>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
