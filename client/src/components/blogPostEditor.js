import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../context/myContext";
import { useAlert } from "../context/alertProvider";

const ContentBlock = ({ type, content, onChange, onRemove }) => {
  return (
    <div className="mb-4 p-4 border rounded">
      <select
        value={type}
        onChange={(e) => onChange("type", e.target.value)}
        className="mb-2 p-2 border rounded text-gray-400"
      >
        <option value="paragraph">Paragraph</option>
        <option value="heading">Heading</option>
        <option value="subheading">Subheading</option>
        <option value="image">Image</option>
        <option value="code">Code</option>
      </select>
      {type === "image" ? (
        <input
          type="file"
          onChange={(e) => onChange("text", e.target.files[0])}
          className="mb-2 p-2 border rounded w-full"
        />
      ) : (
        <textarea
          value={content}
          onChange={(e) => onChange("text", e.target.value)}
          className="mb-2 p-2 border rounded w-full"
          rows="3"
        />
      )}
      <button
        onClick={onRemove}
        className=" bg-purple-600 hover:bg-red-500 text-white px-2 py-1 rounded"
      >
        Remove
      </button>
    </div>
  );
};

const BlogPostEditor = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState([]); //{ type: "paragraph", text: "" }
  const { token, blogPost, setBlogPost } = useContext(MyContext);
  const navigate = useNavigate();
  const { successAlert, errorAlert } = useAlert();

  const addContentBlock = () => {
    setContents([...contents, { type: "paragraph", text: "" }]);
  };

  const removeContentBlock = (index) => {
    setContents(contents.filter((_, i) => i !== index));
  };

  const updateContentBlock = (index, field, value) => {
    const newContents = [...contents];
    newContents[index][field] = value;
    setContents(newContents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contents.length === 0) {
      errorAlert("Please add at least one content block before submitting.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/blogs",
        {
          title,
          contents,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        successAlert("post created successfully");
        navigate("/blog");
      }
    } catch (error) {
      errorAlert("error creating post");
      console.error("Error submitting post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-8 ">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter blog post title"
        className="mb-4 p-2 border rounded w-full"
      />
      {contents.map((content, index) => (
        <ContentBlock
          key={index}
          type={content.type}
          content={content.text}
          onChange={(field, value) => updateContentBlock(index, field, value)}
          onRemove={() => removeContentBlock(index)}
        />
      ))}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
        <button
          type="button"
          onClick={addContentBlock}
          className="w-full sm:w-auto bg-purple-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Add Content Block
        </button>
        <button
          type="submit"
          className="w-full sm:w-auto bg-purple-600 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Submit Post
        </button>
      </div>
      {/* <button
        type="button"
        onClick={addContentBlock}
        className="mb-4 bg-purple-600 text-white px-4 py-2 rounded"
      >
        Add Content Block
      </button>
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Submit Post
      </button> */}
    </form>
  );
};

export default BlogPostEditor;
