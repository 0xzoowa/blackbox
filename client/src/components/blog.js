import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusCircle,
  FileX,
  UserX,
  X,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import BlogPostEditor from "./blogPostEditor";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAlert } from "../context/alertProvider";
import { useGlobalState } from "../context/globalState";
import BlogLoading from "./blogLoading";

const Blog = ({ blogPosts }) => {
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [expandedPost, setExpandedPost] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalBlogs: 0,
    limit: 10,
  });

  const { isLoggedIn, setBlogPost, blogPost, token, isAdmin, baseUrl } =
    useGlobalState();
  const { successAlert, errorAlert } = useAlert();
  const navigate = useNavigate();

  const handleEditPost = (post) => {
    navigate(`/blog/edit/${post._id}`, { state: { post } });
  };

  useEffect(() => {
    const categories = new Set();
    blogPost.forEach((post) => {
      post.categories?.forEach((category) => categories.add(category));
    });
    setUniqueCategories(Array.from(categories));
  }, [blogPost]);

  const filteredPosts =
    selectedCategories.length > 0
      ? blogPosts.filter((post) =>
          post.categories?.some((category) =>
            selectedCategories.includes(category)
          )
        )
      : blogPost;

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const clearCategories = () => {
    setSelectedCategories([]);
  };

  const fetchBlogPost = async (page = 1, limit = 5) => {
    try {
      const response = await axios.get(`${baseUrl}/api/blogs`, {
        params: { page, limit },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return {
        blogs: response.data.data,
        paginationInfo: response.data.pagination,
      };
    } catch (error) {
      errorAlert("Error fetching blog posts");
    }
  };

  // Handle share functionality
  const handleShare = async (e, postId) => {
    e.stopPropagation(); // Prevent post expansion when clicking share
    const shareUrl = `${window.location.origin}/post/${postId}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      successAlert("Link copied to clipboard!");
    } catch (err) {
      errorAlert("Failed to copy link");
    }
  };

  const fetchData = async (newPage = 1) => {
    try {
      setLoading(true);
      const { blogs, paginationInfo } = await fetchBlogPost(newPage);
      if (blogs) {
        const transformedData = blogs.map((post) => ({
          _id: post._id,
          title: post.title,
          content: post.content.map((contentId) => ({
            type: contentId.type,
            text: contentId.text,
          })),
          categories: post.categoryId.map((categoryId) => categoryId.name),
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        }));
        setBlogPost(transformedData);
        setPagination(paginationInfo);
      }
    } catch (error) {
      errorAlert("Cannot fetch data at this moment");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, setBlogPost]);

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`${baseUrl}/api/blogs/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      successAlert("post deleted successfully");
      fetchData();
    } catch (error) {
      errorAlert("Error deleting blog post");
    }
  };

  const handleArchivePost = async (postId) => {
    try {
      await axios.put(
        `${baseUrl}/api/blogs/${postId}/archive`,
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
      errorAlert("Error archiving blog post");
    }
  };

  const togglePostContent = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const handlePageChange = async (newPage) => {
    try {
      setLoading(true);
      await fetchData(newPage);
    } catch (error) {
      errorAlert("Error changing page");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <BlogLoading />;

  return (
    <>
      {isLoggedIn ? (
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl min-h-[calc(100vh-64px-56px)]">
          {uniqueCategories.length > 0 && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4">
              <div className="flex flex-wrap gap-2 items-center">
                <p className="text-xs font-semibold mr-2 w-full sm:w-auto mb-2 sm:mb-0">
                  Filter by Category:
                </p>
                <div className="flex flex-wrap gap-2">
                  {uniqueCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryToggle(category)}
                      className={`
                        px-2 sm:px-3 py-1 rounded-full text-xs transition-colors
                        ${
                          selectedCategories.includes(category)
                            ? "bg-purple-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }
                      `}
                    >
                      {category}
                    </button>
                  ))}
                  {selectedCategories.length > 0 && (
                    <button
                      onClick={clearCategories}
                      className="text-red-500 hover:text-red-700 flex items-center text-xs"
                    >
                      <X size={16} className="mr-1" /> Clear
                    </button>
                  )}
                </div>
              </div>
              {selectedCategories.length > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  Showing posts in: {selectedCategories.join(", ")}
                </p>
              )}
            </div>
          )}

          {isFormVisible && <BlogPostEditor />}

          <div className="pt-6 space-y-4 sm:space-y-6">
            {!isFormVisible && filteredPosts.length > 0
              ? filteredPosts.map((post) => (
                  <article
                    key={post._id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 relative group"
                    onClick={() => togglePostContent(post._id)}
                  >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs px-2 py-1 rounded z-10 hidden sm:block">
                      Click to expand
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {post.categories?.map((category) => (
                        <span
                          key={category}
                          className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold mb-2">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>

                    <div className="prose prose-sm sm:prose">
                      <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm sm:text-base line-clamp-3">
                        {post.content[0]?.text || ""}
                      </p>
                    </div>

                    {/* {expandedPost === post._id && (
                      <Link
                        to={`/post/${post._id}`}
                        className="text-indigo-600 hover:underline text-sm sm:text-base"
                      >
                        Read More ...
                      </Link>
                    )} */}
                    <div className="flex justify-between items-center">
                      {expandedPost === post._id && (
                        <Link
                          to={`/post/${post._id}`}
                          className="text-indigo-600 hover:underline text-sm sm:text-base"
                        >
                          Read More ...
                        </Link>
                      )}

                      <button
                        onClick={(e) => handleShare(e, post._id)}
                        className="ml-auto flex items-center gap-1 px-2 py-1 text-xs sm:text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                        title="Share post"
                      >
                        <Share2 size={16} />
                        <span className="hidden sm:inline">Share</span>
                      </button>
                    </div>
                    {isLoggedIn && isAdmin && (
                      <div className="flex flex-wrap gap-2 justify-end mt-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditPost(post);
                          }}
                          className="px-2 py-1 text-xs sm:text-sm border hover:bg-indigo-600 hover:text-white border-gray-300 dark:border-gray-600 rounded-md"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePost(post._id);
                          }}
                          className="px-2 py-1 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-indigo-600 hover:text-white"
                        >
                          Delete
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleArchivePost(post._id);
                          }}
                          className="px-2 py-1 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-indigo-600 hover:text-white"
                        >
                          Archive
                        </button>
                      </div>
                    )}
                  </article>
                ))
              : !isFormVisible && (
                  <div className="flex flex-col items-center justify-center h-64">
                    <FileX size={48} className="text-gray-400 mb-4" />
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      No blog posts found
                    </p>
                  </div>
                )}
          </div>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-center items-center mt-6 space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className={`
        flex items-center px-4 py-2 rounded-md text-sm w-full sm:w-auto justify-center
        ${
          pagination.currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }
      `}
              >
                <ChevronLeft size={16} className="mr-1" /> Previous
              </button>

              <span className="text-sm text-gray-600 mx-4 hidden sm:inline">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>

              <span className="text-sm text-gray-600 mb-2 sm:hidden">
                {pagination.currentPage}/{pagination.totalPages}
              </span>

              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className={`
        flex items-center px-4 py-2 rounded-md text-sm w-full sm:w-auto justify-center
        ${
          pagination.currentPage === pagination.totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }
      `}
              >
                Next <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          )}

          {isAdmin && !isFormVisible && (
            <div className="fixed bottom-16 sm:bottom-20 right-4 sm:right-8 group">
              <Link
                to="/blog/create"
                onClick={() => setIsFormVisible(true)}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 flex items-center justify-center shadow-lg"
              >
                <PlusCircle size={20} className="sm:w-6 sm:h-6" />
              </Link>
              <span className="absolute bottom-14 sm:bottom-16 right-0 bg-indigo-800 text-white px-2 py-1 rounded text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Add Blog Post
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 px-4 text-center">
          <UserX size={48} className="mb-4" />
          <Link to="/guest" className="hover:underline text-sm sm:text-base">
            Tour as guest to continue
          </Link>
        </div>
      )}
    </>
  );
};

export default Blog;
