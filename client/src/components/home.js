import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../context/globalState";

const Home = () => {
  const { isLoggedIn, logout, isAdmin } = useGlobalState();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-164px)] p-4 md:p-12">
      <div className="flex flex-col items-center justify-center flex-grow text-center">
        <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Hi👋🏾, Welcome to blackbox.
        </h1>

        <div className="flex flex-row items-center justify-center gap-3 md:gap-4 w-full">
          <Link
            to="/about"
            className="whitespace-nowrap px-4 md:px-6 py-2 text-sm md:text-base text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            About
          </Link>

          {!isLoggedIn ? (
            <Link
              to="/guest"
              className="whitespace-nowrap px-4 md:px-6 py-2 text-sm md:text-base text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Tour as guest
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="whitespace-nowrap px-4 md:px-6 py-2 text-sm md:text-base  text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
