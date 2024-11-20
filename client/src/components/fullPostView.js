import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import BlogPost from "./blogPost";
import { useAlert } from "../context/alertProvider";
import { useGlobalState } from "../context/globalState";
import BlogLoading from "./blogLoading";
import { ArrowLeft } from "lucide-react";
import PostNotFound from "./notFound";

const FullPost = ({ blogPosts }) => {
  const [data, setData] = useState([]);
  const { baseUrl } = useGlobalState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchBlogPost = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/blogs/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const d = response.data.data;
      return d;
    } catch (error) {
      // errorAlert("Error fetching blog posts");
      return false;
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const blog = await fetchBlogPost();
      if (!blog) {
        setData(null);
      }
      const transformedData = {
        _id: blog._id,
        title: blog.title,
        content: blog.content.map((contentId) => ({
          type: contentId.type,
          text: contentId.text,
        })),
        categories: blog.categoryId.map((categoryId) => categoryId.name),
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      };
      setData(transformedData);
    } catch (error) {
      // errorAlert("something went wrong.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setData]);

  // const post = data.find((element) => {
  //   return Object.entries(element).some(
  //     ([key, value]) => key === "_id" && value === id
  //   );
  // });
  // console.log("blog post", blogPosts);
  // console.log("post", post);
  // // console.log("id", id);

  const post = data;

  if (!post) return <PostNotFound />;
  if (loading) return <BlogLoading />;

  // return (
  //   <div className="max-w-3xl mx-auto pb-16 pt-8 ">
  //     <BlogPost
  //       key={post._id}
  //       title={post.title || "Untitled"}
  //       content={post.content || []}
  //     />
  //     <Link
  //       to="/blog"
  //       className="mt-8 ml-4 inline-block text-indigo-600 hover:underline"
  //     >
  //       Back to all posts
  //     </Link>
  //   </div>
  // );
  return (
    <div className="w-full px-4 sm:px-6 max-w-3xl mx-auto pb-16 pt-4 sm:pt-8">
      {/* Optional: Back Button with Icon for better mobile UX */}
      <div className="mb-4 sm:mb-6">
        <Link
          to="/blog"
          className="flex items-center text-indigo-600 hover:text-indigo-700 text-sm sm:text-base transition-colors"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Back to all posts
        </Link>
      </div>

      <BlogPost
        key={post._id}
        title={post.title || "Untitled"}
        content={post.content || []}
      />
    </div>
  );
};
export default FullPost;
