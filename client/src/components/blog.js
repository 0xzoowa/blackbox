import React, { useState, useEffect } from "react";
import { PlusCircle, FileX } from "lucide-react";
import BlogPostForm from "./BlogPostForm";

const Blog = () => {
  const mockBlogPosts = [
    {
      _id: "1",
      title: "Exploring React Hooks",
      content:
        "React hooks are a powerful feature that allows you to use state and other React features without writing a class. They simplify the process of managing state and lifecycle events in functional components.",
      createdAt: "2024-09-15T10:00:00Z",
    },
    {
      _id: "2",
      title: "Understanding JavaScript Closures",
      content:
        "Closures are a fundamental concept in JavaScript that allows functions to have access to variables from their outer scope even after that outer function has returned.",
      createdAt: "2024-09-16T11:30:00Z",
    },
    {
      _id: "3",
      title: "The Rise of TypeScript",
      content:
        "TypeScript has become increasingly popular among developers due to its ability to provide static typing and other features that enhance JavaScript development.",
      createdAt: "2024-09-17T09:45:00Z",
    },
    {
      _id: "4",
      title: "CSS Grid Layout: A Comprehensive Guide",
      content:
        "CSS Grid Layout provides a two-dimensional layout system that is perfect for building complex web layouts with ease. This guide covers the basics and advanced techniques.",
      createdAt: "2024-09-18T12:15:00Z",
    },
    {
      _id: "5",
      title: "Building RESTful APIs with Node.js",
      content:
        "Node.js is an excellent choice for building RESTful APIs. This post discusses best practices and patterns for creating scalable and maintainable APIs.",
      createdAt: "2024-09-19T08:30:00Z",
    },
    {
      _id: "6",
      title: "Getting Started with GraphQL",
      content:
        "GraphQL is a powerful alternative to REST for building APIs. This article introduces you to GraphQL concepts and how to get started with your first GraphQL API.",
      createdAt: "2024-09-20T14:00:00Z",
    },
    {
      _id: "7",
      title: "Introduction to Machine Learning",
      content:
        "Machine learning is revolutionizing many industries. In this post, we will explore the basics of machine learning and its real-world applications.",
      createdAt: "2024-09-21T15:20:00Z",
    },
    {
      _id: "8",
      title: "Web Accessibility Best Practices",
      content:
        "Creating accessible web applications is crucial for inclusivity. This guide covers best practices for ensuring your web applications are accessible to all users.",
      createdAt: "2024-09-22T10:10:00Z",
    },
    {
      _id: "9",
      title: "DevOps: The Future of Software Development",
      content:
        "DevOps is changing the way software is developed and delivered. This post discusses the principles of DevOps and how it can improve your development workflow.",
      createdAt: "2024-09-23T11:50:00Z",
    },
    {
      _id: "10",
      title: "A Beginner's Guide to Docker",
      content:
        "Docker is an essential tool for developers today. In this article, we will cover the basics of Docker and how to containerize your applications.",
      createdAt: "2024-09-24T13:30:00Z",
    },
  ];

  const [blogPosts, setBlogPosts] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      // Retrieve the token from localStorage (or wherever it's stored)
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjgxZmUwMTlmOWE0NDcxYjRhYTYxYyIsImlhdCI6MTcyNzUzODMwNywiZXhwIjoxNzM1MzE0MzA3fQ.8uh44D4p8432Qhu8YVZEmirG76q4737mwYMQNnES2ic";
      const response = await fetch("http://localhost:5000/api/blogs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the Bearer token here
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBlogPosts(data);
      } else {
        console.error("Failed to fetch blog posts:", response.statusText);
        // Optionally handle error responses here (e.g., 401 Unauthorized)
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  const handleCreatePost = async (postData) => {
    try {
      const response = await fetch("http://localhost:5000/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        fetchBlogPosts();
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
        fetchBlogPosts();
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
          fetchBlogPosts();
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
        fetchBlogPosts();
      }
    } catch (error) {
      console.error("Error archiving blog post:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 relative min-h-[calc(100vh-64px-50px)]">
      {/* <h2 className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400">
        Blog Posts
      </h2> */}

      {isFormVisible && (
        <BlogPostForm
          post={editingPost}
          onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
          onCancel={() => {
            setIsFormVisible(false);
            setEditingPost(null);
          }}
        />
      )}

      {blogPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">
                {post.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {post.content.substring(0, 100)}...
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setEditingPost(post);
                    setIsFormVisible(true);
                  }}
                  className="px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePost(post._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleArchivePost(post._id)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                >
                  Archive
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <FileX size={64} className="text-gray-400 mb-4" />
          <p className="text-base text-gray-600 dark:text-gray-400">
            No blog posts found
          </p>
        </div>
      )}

      {!isFormVisible && (
        <div className="fixed bottom-20 right-8 group">
          <button
            onClick={() => setIsFormVisible(true)}
            className="w-14 h-14 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center shadow-lg"
          >
            <PlusCircle size={24} />
          </button>
          <span className="absolute bottom-16 right-0 bg-indigo-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Add Blog Post
          </span>
        </div>
      )}
    </div>
  );
};

export default Blog;

// import React, { useState, useEffect } from "react";
// import { PlusCircle } from "lucide-react";
// import BlogPostForm from "./BlogPostForm";

// const Blog = () => {
//   const [blogPosts, setBlogPosts] = useState([]);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [editingPost, setEditingPost] = useState(null);

//   useEffect(() => {
//     fetchBlogPosts();
//   }, []);

//   const fetchBlogPosts = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/blog");
//       const data = await response.json();
//       setBlogPosts(data);
//     } catch (error) {
//       console.error("Error fetching blog posts:", error);
//     }
//   };

//   const handleCreatePost = async (postData) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/blog", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(postData),
//       });
//       if (response.ok) {
//         fetchBlogPosts();
//         setIsFormVisible(false);
//       }
//     } catch (error) {
//       console.error("Error creating blog post:", error);
//     }
//   };

//   const handleUpdatePost = async (postData) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/blog/${editingPost._id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(postData),
//         }
//       );
//       if (response.ok) {
//         fetchBlogPosts();
//         setEditingPost(null);
//         setIsFormVisible(false);
//       }
//     } catch (error) {
//       console.error("Error updating blog post:", error);
//     }
//   };

//   const handleDeletePost = async (postId) => {
//     if (window.confirm("Are you sure you want to delete this post?")) {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/blog/${postId}`,
//           {
//             method: "DELETE",
//           }
//         );
//         if (response.ok) {
//           fetchBlogPosts();
//         }
//       } catch (error) {
//         console.error("Error deleting blog post:", error);
//       }
//     }
//   };

//   const handleArchivePost = async (postId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/blog/${postId}/archive`,
//         {
//           method: "PUT",
//         }
//       );
//       if (response.ok) {
//         fetchBlogPosts();
//       }
//     } catch (error) {
//       console.error("Error archiving blog post:", error);
//     }
//   };
//   return (
//     <div className="container mx-auto p-6 relative min-h-screen">
//       <h2 className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400">
//         Blog Posts
//       </h2>

//       {isFormVisible && (
//         <BlogPostForm
//           post={editingPost}
//           onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
//           onCancel={() => {
//             setIsFormVisible(false);
//             setEditingPost(null);
//           }}
//         />
//       )}

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {blogPosts.map((post) => (
//           <article
//             key={post._id}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//           >
//             <h3 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">
//               {post.title}
//             </h3>
//             <p className="text-gray-700 dark:text-gray-300 mb-4">
//               {post.content.substring(0, 100)}...
//             </p>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
//               {new Date(post.createdAt).toLocaleDateString()}
//             </p>
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => {
//                   setEditingPost(post);
//                   setIsFormVisible(true);
//                 }}
//                 className="px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDeletePost(post._id)}
//                 className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
//               >
//                 Delete
//               </button>
//               <button
//                 onClick={() => handleArchivePost(post._id)}
//                 className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
//               >
//                 Archive
//               </button>
//             </div>
//           </article>
//         ))}
//       </div>

//       {!isFormVisible && (
//         <div className="fixed bottom-8 right-8 group">
//           <button
//             onClick={() => setIsFormVisible(true)}
//             className="w-14 h-14 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center shadow-lg"
//           >
//             <PlusCircle size={24} />
//           </button>
//           <span className="absolute bottom-16 right-0 bg-indigo-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//             Add Blog Post
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Blog;
