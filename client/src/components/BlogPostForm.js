import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const BlogPostForm = ({ post, onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mediaAttachment, setMediaAttachment] = useState(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      // Assuming the post object has a mediaAttachment field
      setMediaAttachment(post.mediaAttachment);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, mediaAttachment });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMediaAttachment(file);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-2xl relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
          {post ? "Edit Blog Post" : "Create New Blog Post"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="6"
              className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="mediaAttachment"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Media Attachment
            </label>
            <input
              type="file"
              id="mediaAttachment"
              onChange={handleFileChange}
              className="w-full px-3 py-2 text-gray-700 dark:text-gray-300"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              {post ? "Update" : "Create"} Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogPostForm;

// import React, { useState, useEffect } from "react";

// const BlogPostForm = ({ post, onSubmit, onCancel }) => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   useEffect(() => {
//     if (post) {
//       setTitle(post.title);
//       setContent(post.content);
//     }
//   }, [post]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ title, content });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label
//           htmlFor="title"
//           className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//         >
//           Title
//         </label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//         />
//       </div>
//       <div>
//         <label
//           htmlFor="content"
//           className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//         >
//           Content
//         </label>
//         <textarea
//           id="content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           required
//           rows="4"
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//         ></textarea>
//       </div>
//       <div className="flex justify-end space-x-2">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
//         >
//           {post ? "Update" : "Create"} Post
//         </button>
//       </div>
//     </form>
//   );
// };

// export default BlogPostForm;
