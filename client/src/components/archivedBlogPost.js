import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FileX, UserX } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MyContext } from "../context/myContext";
import { useAlert } from "../context/alertProvider";

const ArchivedBlogPost = () => {
  const [loading, setLoading] = useState(false);
  const [archivedPosts, setArchivedPosts] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);
  const { isLoggedIn, token, isAdmin } = useContext(MyContext);
  const { successAlert, errorAlert } = useAlert();
  const navigate = useNavigate();

  const fetchArchivedPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/blogs/archived",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setArchivedPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching archived posts:", error);
      errorAlert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && isAdmin) {
      fetchArchivedPosts();
    }
  }, [isLoggedIn, isAdmin, token]);

  const handleUnarchivePost = async (postId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/blogs/${postId}/unarchive`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      successAlert("Post unarchived successfully");
      fetchArchivedPosts();
    } catch (error) {
      console.log(error.message);
      errorAlert("Error unarchiving blog post");
    }
  };

  const togglePostContent = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  if (loading) return <div>Loading...</div>;

  if (!isLoggedIn || !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <UserX size={64} className="mb-4" />
        <p>You need to be logged in as an admin to view archived posts.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl min-h-[calc(100vh-64px-56px)]">
      <h2 className="text-2xl font-bold mb-6">Archived Posts</h2>
      {archivedPosts.length > 0 ? (
        archivedPosts.map((post) => (
          <article
            key={post._id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 m-8 cursor-pointer"
            onClick={() => togglePostContent(post._id)}
          >
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 mr-5">
              Archived on: {new Date(post.archivedAt).toLocaleDateString()}
            </p>
            {expandedPost === post._id && (
              <div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {post.content[0].text
                    ? post.content[0].text.substring(0, 100) + "..."
                    : ""}
                </p>
              </div>
            )}
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnarchivePost(post._id);
                }}
                className="px-2 py-1 border hover:bg-indigo-600 hover:text-white border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                Unarchive
              </button>
            </div>
          </article>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <FileX size={64} className="text-gray-400 mb-4" />
          <p className="text-base text-gray-600 dark:text-gray-400">
            No archived posts found
          </p>
        </div>
      )}
    </div>
  );
};

export default ArchivedBlogPost;
