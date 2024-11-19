import React from "react";
import { Loader2 } from "lucide-react";

const BlogLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-10 md:p-20 lg:p-40">
      <div className="text-center max-w-full sm:max-w-md">
        <Loader2
          className="mx-auto mb-2 sm:mb-4 animate-spin text-purple-600"
          size={48} // Slightly smaller on mobile
          strokeWidth={2}
        />
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
          Loading Blog Posts
        </h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          Fetching the latest contents for you...
        </p>
      </div>
    </div>
  );
};

export default BlogLoading;
