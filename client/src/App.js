import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import Blog from "./components/blog";
import Footer from "./components/footer";
import Login from "./components/login";
import FullPost from "./components/fullPostView";
import Guest from "./components/guest";
import { MyContext } from "./context/myContext";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [blogPost, setBlogPost] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (user && user.role === "chief") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const blogPosts = [
    {
      _id: "1",
      title: "Exploring C# Basics",
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
      createdAt: "2024-09-15T10:00:00Z",
    },
    {
      _id: "2",
      title: "Why Learn C#?",
      content: [
        { type: "heading", text: "Why Learn C#?" },
        {
          type: "paragraph",
          text: "C# combines the power and flexibility of C++ with the simplicity of Visual Basic. It's an excellent language for beginners and experienced programmers alike, offering features like:",
        },
      ],
      createdAt: "2024-09-16T11:30:00Z",
    },
    {
      _id: "3",
      title: "Understanding C# Type Safety",
      content: [
        { type: "subheading", text: "1. Type Safety" },
        {
          type: "paragraph",
          text: "C# is a statically-typed language, which means it checks for type errors at compile-time, reducing runtime errors.",
        },
      ],
      createdAt: "2024-09-17T09:45:00Z",
    },
    {
      _id: "4",
      title: "C# and Object-Oriented Programming",
      content: [
        { type: "subheading", text: "2. Object-Oriented" },
        {
          type: "paragraph",
          text: "It fully supports object-oriented programming concepts like encapsulation, inheritance, and polymorphism.",
        },
      ],
      createdAt: "2024-09-18T12:15:00Z",
    },
    {
      _id: "5",
      title: "C# Code Example",
      content: [
        {
          type: "attachment",
          url: "/api/placeholder/600/400",
          alt: "C# Code Example",
        },
      ],
      createdAt: "2024-09-19T08:30:00Z",
    },
    {
      _id: "6",
      title: "Your First C# Program",
      content: [
        { type: "heading", text: "Your First C# Program" },
        {
          type: "paragraph",
          text: "Let's start with the classic 'Hello, World!' program in C#:",
        },
      ],
      createdAt: "2024-09-20T14:00:00Z",
    },
    {
      _id: "7",
      title: "C# Hello, World Program",
      content: [
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
      ],
      createdAt: "2024-09-21T15:20:00Z",
    },
    {
      _id: "8",
      title: "C# Application Structure",
      content: [
        {
          type: "paragraph",
          text: "This simple program demonstrates the basic structure of a C# application. The 'using System;' line allows us to use classes from the System namespace, which includes Console for input/output operations.",
        },
      ],
      createdAt: "2024-09-22T10:10:00Z",
    },
    {
      _id: "9",
      title: "Next Steps in C#",
      content: [
        { type: "heading", text: "Next Steps" },
        {
          type: "paragraph",
          text: "Now that you've seen a basic C# program, you're ready to dive deeper into the language. In future posts, we'll explore variables, control structures, classes, and more. Stay tuned!",
        },
      ],
      createdAt: "2024-09-23T11:50:00Z",
    },
  ];

  //blog functionalities
  //persist state

  return (
    <Router>
      <div
        className={`min-h-screen flex flex-col ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        } `}
      >
        <MyContext.Provider
          value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            token,
            setToken,
            isAdmin,
            setIsAdmin,
          }}
        >
          <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <div className="pt-16 flex-grow pb-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/blog"
                element={<Blog blogPosts={blogPosts} token={token} />}
              />
              <Route path="/login" element={<Login />} />
              <Route
                path="/post/:id"
                element={<FullPost blogPosts={blogPosts} />}
              />
              <Route path="/guest" element={<Guest />} />
            </Routes>
          </div>

          <Footer />
        </MyContext.Provider>
      </div>
    </Router>
  );
};

export default App;
