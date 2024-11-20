import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileX, Home, ArrowLeft } from "lucide-react";

const PostNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px-56px)] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon and Message */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <FileX className="w-14 h-14 sm:w-16 sm:h-16 text-gray-400 animate-pulse" />
          </div>
          {/* <h1 className="text-l sm:text-xl font-bold text-gray-800 dark:text-gray-200">
            Post Not Found
          </h1> */}
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Sorry, the blog post you're looking for doesn't exist or may have
            been removed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 sm:space-y-4">
          {/* <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base flex items-center justify-center gap-2 text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Go Back
          </button> */}

          <Link
            to="/blog"
            className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:bg-purple-700 rounded-lg transition-colors duration-200"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            Go to Blog
          </Link>
        </div>

        {/* Additional Help Text */}
        {/* <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-6">
          If you believe this is an error, please try refreshing the page or
          contact support.
        </p> */}
      </div>
    </div>
  );
};

export default PostNotFound;
