import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FileX, UserX } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MyContext } from "../context/myContext";
import { useAlert } from "../context/alertProvider";
import { useGlobalState } from "../context/globalState";

const DeletedBlogPost = () => {
  const [loading, setLoading] = useState(false);
  const [deletedPosts, setDeletedPosts] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);
  const { isLoggedIn, token, isAdmin } = useGlobalState();
  const { successAlert, errorAlert } = useAlert();
  const navigate = useNavigate();
  const gt = localStorage.getItem("token");

  console.log("token ", gt);

  const fetchDeletedPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/blogs/deleted",
        {
          headers: {
            Authorization: `Bearer ${gt}`,
            "Content-Type": "application/json",
          },
        }
      );
      setDeletedPosts(response.data.data);
      console.log("dp", response.data.data);
    } catch (error) {
      console.error("Error fetching deleted posts:", error);
      errorAlert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && isAdmin) {
      fetchDeletedPosts();
    }
  }, [isLoggedIn, isAdmin, token]);

  const handleRestorePost = async (postId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/blogs/${postId}/restore`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      successAlert("Post restored successfully");
      fetchDeletedPosts();
    } catch (error) {
      console.log(error.message);
      errorAlert("Error restoring blog post");
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
        <p>You need to be logged in as an admin to view deleted posts.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl min-h-[calc(100vh-64px-56px)]">
      <h2 className="text-2xl font-bold mb-6">Deleted Posts</h2>
      {deletedPosts.length > 0 ? (
        deletedPosts.map((post) => (
          <article
            key={post._id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 m-8 cursor-pointer"
            onClick={() => togglePostContent(post._id)}
          >
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 mr-5">
              Deleted on: {new Date(post.deletedAt).toLocaleDateString()}
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
                  handleRestorePost(post._id);
                }}
                className="px-2 py-1 border hover:bg-indigo-600 hover:text-white border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                Restore
              </button>
            </div>
          </article>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <FileX size={64} className="text-gray-400 mb-4" />
          <p className="text-base text-gray-600 dark:text-gray-400">
            No deleted posts found
          </p>
        </div>
      )}
    </div>
  );
};

export default DeletedBlogPost;
