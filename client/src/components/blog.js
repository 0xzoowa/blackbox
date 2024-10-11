import React, { useState, useEffect } from "react";
import BlogPost from "./blogPost";
import { PlusCircle, FileX } from "lucide-react";
import BlogPostForm from "./BlogPostForm";
import FullPost from "./fullPostView";
import { Link } from "react-router-dom";

const Blog = ({ blogPosts }) => {
  // const [blogPosts, setBlogPosts] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null);

  // useEffect(() => {
  //   fetchBlogPosts();
  // }, []);

  // const fetchBlogPosts = async () => {
  //   try {
  //     // Retrieve the token from localStorage (or wherever it's stored)
  //     const token =
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjgxZmUwMTlmOWE0NDcxYjRhYTYxYyIsImlhdCI6MTcyNzUzODMwNywiZXhwIjoxNzM1MzE0MzA3fQ.8uh44D4p8432Qhu8YVZEmirG76q4737mwYMQNnES2ic";
  //     const response = await fetch("http://localhost:5000/api/blogs", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`, // Include the Bearer token here
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setBlogPosts(data);
  //     } else {
  //       console.error("Failed to fetch blog posts:", response.statusText);
  //       // Optionally handle error responses here (e.g., 401 Unauthorized)
  //     }
  //   } catch (error) {
  //     console.error("Error fetching blog posts:", error);
  //   }
  // };

  const handleCreatePost = async (postData) => {
    try {
      const response = await fetch("http://localhost:5000/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        // fetchBlogPosts();
        setIsFormVisible(false);
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  const handleUpdatePost = async (postData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/blog/${editingPost._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        }
      );
      if (response.ok) {
        // fetchBlogPosts();
        setEditingPost(null);
        setIsFormVisible(false);
      }
    } catch (error) {
      console.error("Error updating blog post:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/blog/${postId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          // fetchBlogPosts();
        }
      } catch (error) {
        console.error("Error deleting blog post:", error);
      }
    }
  };

  const handleArchivePost = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/blog/${postId}/archive`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        // fetchBlogPosts();
      }
    } catch (error) {
      console.error("Error archiving blog post:", error);
    }
  };

  const togglePostContent = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl min-h-[calc(100vh-64px-56px)]">
      {blogPosts.map((post) => (
        <article
          key={post._id}
          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 m-8 cursor-pointer"
          onClick={() => togglePostContent(post._id)}
        >
          <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 mr-5">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          {expandedPost === post._id ? (
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {post.content[0].text
                  ? post.content[0].text.substring(0, 100)
                  : ""}
                {/* {post.content.map((p, index) => (
                <p key={index}>{p.text ? p.text.substring(0, 100) : ""}</p>
              ))} */}
              </p>
              <span>
                <Link
                  to={`/post/${post._id}`}
                  className="text-black hover:underline"
                >
                  Read More ...
                </Link>
              </span>
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <div className="flex-grow max-w-3xl">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {post.content[0].text
                    ? post.content[0].text.substring(0, 100)
                    : ""}
                </p>
              </div>
            </p>
          )}
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditingPost(post);
                setIsFormVisible(true);
              }}
              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeletePost(post._id);
              }}
              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              Delete
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleArchivePost(post._id);
              }}
              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              Archive
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Blog;
