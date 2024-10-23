import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, FileX, UserX } from "lucide-react";
import BlogPostEditor from "./blogPostEditor";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAlert } from "../context/alertProvider";
import { useGlobalState } from "../context/globalState";

const Blog = ({ blogPosts }) => {
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [expandedPost, setExpandedPost] = useState(null);
  const { isLoggedIn, setBlogPost, token, isAdmin } = useGlobalState();
  const { successAlert, errorAlert } = useAlert();
  const navigate = useNavigate();

  const handleEditPost = (post) => {
    navigate(`/blog/edit/${post._id}`, { state: { post } });
    // console.log("state post", post);
  };

  const fetchBlogPost = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/blogs",

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("data blog", response.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      throw error;
    }
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const blogs = await fetchBlogPost();
      if (blogs) {
        // Transform the data to match expected format
        const transformedData = blogs.map((post) => ({
          _id: post._id,
          title: post.title,
          content: post.content.map((contentId) => ({
            type: contentId.type,
            text: contentId.text,
          })),
          createdAt: post.createdAt,
        }));
        setBlogPost(transformedData);
      }
    } catch (error) {
      console.log(error.message);
      errorAlert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, setBlogPost]);

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      successAlert("post deleted successfully");
      fetchData();
    } catch (error) {
      console.log(error.message);
      errorAlert("Error deleting blog post");
    }
  };

  const handleArchivePost = async (postId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/blogs/${postId}/archive`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      successAlert("post archived successfully");
      fetchData();
    } catch (error) {
      console.log(error.message);
      errorAlert("Error archiving blog post");
    }
  };

  const togglePostContent = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };
  if (loading) return <div>Loading...</div>;

  return (
    <>
      {isLoggedIn ? (
        <div className="container mx-auto p-6 max-w-3xl min-h-[calc(100vh-64px-56px)]">
          {isFormVisible && <BlogPostEditor />}
          {!isFormVisible && blogPosts.length > 0
            ? blogPosts.map((post) => (
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
                      </p>
                      <span>
                        <Link
                          to={`/post/${post._id}`}
                          className="text-indigo-600 hover:underline"
                        >
                          Read More ...
                        </Link>
                      </span>
                    </div>
                  ) : (
                    <div className="flex-grow max-w-3xl">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {/* add checks to handle empty content array */}
                        {post.content[0].text
                          ? post.content[0].text.substring(0, 100)
                          : ""}
                      </p>
                    </div>
                  )}
                  {isLoggedIn && isAdmin && (
                    <div className="flex justify-end space-x-2 mt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditPost(post);
                        }}
                        className="px-2 py-1 border hover:bg-indigo-600  hover:text-white border-gray-300 dark:border-gray-600 rounded-md  focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePost(post._id);
                        }}
                        className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-indigo-600  hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArchivePost(post._id);
                        }}
                        className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
                      >
                        Archive
                      </button>
                    </div>
                  )}
                </article>
              ))
            : !isFormVisible && (
                <div className="flex flex-col items-center justify-center h-64">
                  <FileX size={64} className="text-gray-400 mb-4" />
                  <p className="text-base text-gray-600 dark:text-gray-400">
                    No blog posts found
                  </p>
                </div>
              )}
          {isAdmin && !isFormVisible && (
            <div className="fixed bottom-20 right-8 group">
              <Link
                to="/blog/create"
                onClick={(e) => {
                  setIsFormVisible(true);
                }}
                className="w-14 h-14 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center shadow-lg"
              >
                <PlusCircle size={24} />
              </Link>
              <span className="absolute bottom-16 right-0 bg-indigo-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Add Blog Post
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <UserX size={64} className="mb-4" />
          <Link to="/guest" className=" hover:underline">
            Tour as guest to continue
          </Link>
        </div>
      )}
    </>
  );
};

export default Blog;
