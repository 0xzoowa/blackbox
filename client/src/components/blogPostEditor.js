import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useAlert } from "../context/alertProvider";
import { useGlobalState } from "../context/globalState";

const ContentBlock = ({
  type,
  content,
  onChange,
  onRemove,
  index,
  handleFileChange,
  fileRef,
}) => {
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
        <option value="audio">Audio</option>
        <option value="video">Video</option>
        <option value="code">Code</option>
      </select>
      {["image", "audio", "video"].includes(type) ? (
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => handleFileChange(index, e)}
          className="mb-2 p-2 border rounded w-full"
          accept={
            type === "image"
              ? "image/*"
              : type === "audio"
              ? "audio/*"
              : "video/*"
          }
        />
      ) : (
        <textarea
          value={content}
          name="text"
          onChange={(e) => onChange("text", e.target.value)}
          className="mb-2 p-2 border rounded w-full"
          rows="3"
        />
      )}
      <button
        type="button"
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
  const { token } = useGlobalState();
  const [file, setFile] = useState([]);
  const fileRefs = useRef([]);
  const navigate = useNavigate();
  const { successAlert, errorAlert } = useAlert();
  const { id } = useParams();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id && location.state && location.state.post) {
      const { title, content } = location.state.post;
      setTitle(title);
      setContents(content);

      setFile(file);
      setIsEditing(true);
      /**
       * pending functionalities
       * edit post
       * handle gif, video and audio media formats for upload
       */
    }
  }, [id, location.state]);

  const addContentBlock = () => {
    setContents([...contents, { type: "paragraph", text: "" }]);
    setFile([...file, null]);
  };

  const removeContentBlock = (index, type) => {
    setContents(contents.filter((_, i) => i !== index));

    setFile(file.filter((_, i) => i !== index));
  };

  const updateContentBlock = (index, field, value, type) => {
    const newContents = [...contents];
    newContents[index][field] = value;
    setContents(newContents);
  };
  const handleFileChange = (index, event) => {
    const newFiles = [...file];
    newFiles[index] = event.target.files[0];
    setFile(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contents.length === 0) {
      errorAlert("Please add at least one content block before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("contents", JSON.stringify(contents));
    file.forEach((file, index) => {
      if (file) {
        formData.append("media", file);
      }
    });

    console.log("form-data", formData.getAll("media"));

    try {
      let response;
      if (isEditing) {
        response = await axios.put(
          `http://localhost:5000/api/blogs/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:5000/api/blogs",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      console.log(response.data);
      if (response.status === 200 || response.status === 201) {
        successAlert(
          isEditing ? "Post updated successfully" : "Post created successfully"
        );
        navigate("/blog");
      }
    } catch (error) {
      errorAlert(isEditing ? "Error updating post" : "Error creating post");
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
          onChange={(field, value) =>
            updateContentBlock(index, field, value, content.type)
          }
          onRemove={() => removeContentBlock(index, content.type)}
          setFile={setFile}
          handleFileChange={handleFileChange}
          index={index}
          fileRef={(el) => (fileRefs.current[index] = el)}
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
    </form>
  );
};

export default BlogPostEditor;
