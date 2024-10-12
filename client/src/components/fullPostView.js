import React from "react";
import { Link, useParams } from "react-router-dom";
import BlogPost from "./blogPost";

const FullPost = ({ blogPosts }) => {
  const { id } = useParams();

  const post = blogPosts.find((element) => {
    return Object.entries(element).some(
      ([key, value]) => key === "_id" && value === id
    );
  });
  console.log(post);

  if (!post) return <div>Post not found</div>;

  return (
    <div className="max-w-3xl mx-auto pb-16 pt-8">
      <BlogPost
        key={post._id}
        title={post.title || "Untitled"}
        content={post.content || []}
      />
      <Link
        to="/blog"
        className="mt-8 inline-block text-blue-400 hover:underline"
      >
        Back to all posts
      </Link>
    </div>
  );
};
export default FullPost;
