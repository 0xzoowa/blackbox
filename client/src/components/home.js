import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-64px-56px)] p-12">
      <div className="flex flex-col items-center justify-center flex-grow  p-6">
        <h1 className="text-6xl font-bold mt-8 mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Hi👋🏾, Welcome to blackbox.
        </h1>
        {/* <p className="text-base mt-2 mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
          <Link to="/about">what is blackbox?</Link>
        </p> */}
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-6 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Login
          </Link>
          <Link
            to="/guest"
            className="px-6 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Tour as guest
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
