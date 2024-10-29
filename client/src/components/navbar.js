import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sun, Moon, Home, Menu, X } from "lucide-react";
import { useGlobalState } from "../context/globalState";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { isLoggedIn } = useGlobalState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink
              to="/"
              className="text-2xl font-bold flex items-center text-white"
            >
              <img
                src="/f.png"
                alt="blackbox"
                className="mr-1 w-14 h-14 md:w-22 md:h-22"
              />
              {/* <span className="hidden sm:block">blackbox</span> */}
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-200"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-200"
            >
              About
            </Link>
            {isLoggedIn && (
              <Link
                to="/blog"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-200"
              >
                Blog
              </Link>
            )}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-purple-700 transition-colors text-white"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-purple-700 transition-colors text-white"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              {isLoggedIn && (
                <Link
                  to="/blog"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
