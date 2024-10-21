import { React, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sun, Moon, Home } from "lucide-react";
import { MyContext } from "../context/myContext";
import { useGlobalState } from "../context/globalState";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { isLoggedIn } = useGlobalState();
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <NavLink
              to="/"
              className="text-2xl font-bold flex items-center text-white"
            >
              <img src={"/f.png"} alt="Home" className="mr-1 w-14 h-14" />
              {/* <Home size={24} className="mr-2 text-white" /> */}
              blackbox
            </NavLink>
          </div>
          <div className="flex items-center">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
