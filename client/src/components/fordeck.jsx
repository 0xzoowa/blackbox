import React from "react";

const BlogPost = ({ title, content }) => {
  return (
    <article className="mb-8">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      {Array.isArray(content) &&
        content.map((item, index) => {
          switch (item?.type) {
            case "paragraph":
              return (
                <p key={index} className="mb-4">
                  {item.text}
                </p>
              );
            case "heading":
              return (
                <h3 key={index} className="text-2xl font-semibold mb-2">
                  {item.text}
                </h3>
              );
            case "subheading":
              return (
                <h4 key={index} className="text-xl font-medium mb-2">
                  {item.text}
                </h4>
              );
            case "attachment":
              return (
                <div key={index} className="mb-4">
                  <img
                    src={item.url}
                    alt={item.alt || ""}
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              );
            case "code":
              return (
                <pre
                  key={index}
                  className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto"
                >
                  <code>{item.text}</code>
                </pre>
              );
            default:
              return null;
          }
        })}
    </article>
  );
};

const BlogLayout = ({ posts = [] }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">C# Programming Blog</h1>
        </div>
      </header>

      <nav className="bg-blue-800 text-white p-2">
        <div className="container mx-auto">
          <a href="#" className="mr-4 hover:underline">
            Home
          </a>
          <a href="#" className="mr-4 hover:underline">
            Tutorials
          </a>
          <a href="#" className="mr-4 hover:underline">
            About
          </a>
          <a href="#" className="mr-4 hover:underline">
            Contact
          </a>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-8 flex">
        <aside className="w-64 mr-8">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                C# Basics
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

      <footer className="bg-blue-800 text-white p-4 text-center">
        <p>&copy; 2024 C# Programming Blog. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Example usage
const App = () => {
  const posts = [
    {
      title: "Introduction to C#: Getting Started with a Powerful Language",
      content: [
        {
          type: "paragraph",
          text: "C# (pronounced 'C-sharp') is a modern, object-oriented programming language developed by Microsoft. It's part of the .NET framework and is widely used for building Windows applications, web services, and games.",
        },
        { type: "heading", text: "Why Learn C#?" },
        {
          type: "paragraph",
          text: "C# combines the power and flexibility of C++ with the simplicity of Visual Basic. It's an excellent language for beginners and experienced programmers alike, offering features like:",
        },
        { type: "subheading", text: "1. Type Safety" },
        {
          type: "paragraph",
          text: "C# is a statically-typed language, which means it checks for type errors at compile-time, reducing runtime errors.",
        },
        { type: "subheading", text: "2. Object-Oriented" },
        {
          type: "paragraph",
          text: "It fully supports object-oriented programming concepts like encapsulation, inheritance, and polymorphism.",
        },
        {
          type: "attachment",
          url: "/api/placeholder/600/400",
          alt: "C# Code Example",
        },
        { type: "heading", text: "Your First C# Program" },
        {
          type: "paragraph",
          text: "Let's start with the classic 'Hello, World!' program in C#:",
        },
        {
          type: "code",
          text: `using System;

                class Program
                {
                    static void Main()
                    {
                        Console.WriteLine("Hello, World!");
                    }
                }`,
        },
        {
          type: "paragraph",
          text: "This simple program demonstrates the basic structure of a C# application. The 'using System;' line allows us to use classes from the System namespace, which includes Console for input/output operations.",
        },
        { type: "heading", text: "Next Steps" },
        {
          type: "paragraph",
          text: "Now that you've seen a basic C# program, you're ready to dive deeper into the language. In future posts, we'll explore variables, control structures, classes, and more. Stay tuned!",
        },
      ],
    },
  ];

  return <BlogLayout posts={posts} />;
};

export default App;
