import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import Blog from "./components/blog";
import Footer from "./components/footer";
import Login from "./components/login";
import FullPost from "./components/fullPostView";
import Guest from "./components/guest";
import BlogPostEditor from "./components/blogPostEditor";
import { AlertProvider } from "./context/alertProvider";
import ArchivedBlogPost from "./components/archivedBlogPost";
import DeletedBlogPost from "./components/deletedBlogPost";
import { GlobalStateProvider, useGlobalState } from "./context/globalState";

const AppContent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { blogPost } = useGlobalState();
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } `}
    >
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="pt-16 flex-grow pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog blogPosts={blogPost} />} />
          <Route
            path="/blog/archived"
            element={<ArchivedBlogPost blogPosts={blogPost} />}
          />
          <Route
            path="/blog/deleted"
            element={<DeletedBlogPost blogPosts={blogPost} />}
          />
          <Route path="/blog/create" element={<BlogPostEditor />} />
          <Route path="/blog/edit/:id" element={<BlogPostEditor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post/:id" element={<FullPost blogPosts={blogPost} />} />
          <Route path="/guest" element={<Guest />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <AlertProvider>
      <GlobalStateProvider>
        <Router>
          <AppContent />
        </Router>
      </GlobalStateProvider>
    </AlertProvider>
  );
};

export default App;
