import React from "react";

const BlogLayout = ({ posts = [] }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Blog Posts</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8 flex">
        <aside className="w-64 mr-8">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                {/* C# Basics - loop through each heading */}
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Advanced C#
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                .NET Framework
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                ASP.NET
              </a>
            </li>
          </ul>
        </aside>

        <div className="flex-grow max-w-3xl">
          {posts.map((post, index) => (
            <BlogPost
              key={index}
              title={post.title || "Untitled"}
              content={post.content || []}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogLayout;
