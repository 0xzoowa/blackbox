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
    <div className="mb-4 p-3 sm:p-4 border rounded shadow-sm">
      <select
        value={type}
        onChange={(e) => onChange("type", e.target.value)}
        className="mb-2 p-2 border rounded w-full sm:w-auto text-sm sm:text-base text-gray-600 bg-white"
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
        <div className="mt-2">
          <input
            type="file"
            ref={fileRef}
            onChange={(e) => handleFileChange(index, e)}
            className="block w-full text-sm sm:text-base file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0 file:text-sm file:font-semibold
              file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            accept={
              type === "image"
                ? "image/*"
                : type === "audio"
                ? "audio/*"
                : "video/*"
            }
          />
        </div>
      ) : (
        <textarea
          value={content}
          name="text"
          onChange={(e) => onChange("text", e.target.value)}
          className="mt-2 mb-2 p-2 border rounded w-full text-sm sm:text-base min-h-[100px] resize-y"
          placeholder={`Enter your ${type} content here...`}
        />
      )}

      <button
        type="button"
        onClick={onRemove}
        className="mt-2 bg-purple-600 hover:bg-red-500 text-white px-3 py-1.5 rounded text-sm transition-colors duration-200 w-full sm:w-auto"
      >
        Remove Block
      </button>
    </div>
  );
};

const BlogPostEditor = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { token, baseUrl } = useGlobalState();
  const [file, setFile] = useState([]);
  const fileRefs = useRef([]);
  const navigate = useNavigate();
  const { successAlert, errorAlert } = useAlert();
  const { id } = useParams();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/blogs/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data.categories);
      } catch (error) {
        errorAlert("Error fetching categories");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (id && location.state?.post) {
      const { title, content } = location.state.post;
      setTitle(title);
      setContents(content);
      setFile(file);
      setIsEditing(true);
    }
  }, [id, location.state]);

  const handleCategoryChange = (name) => {
    setSelectedCategories((prev) => {
      if (prev.includes(name)) {
        return prev.filter((i) => i !== name);
      }
      if (prev.length >= 3) {
        errorAlert("You can only select up to 3 categories");
        return prev;
      }
      return [...prev, name];
    });
  };

  const addContentBlock = () => {
    setContents([...contents, { type: "paragraph", text: "" }]);
    setFile([...file, null]);
  };

  const removeContentBlock = (index) => {
    setContents(contents.filter((_, i) => i !== index));
    setFile(file.filter((_, i) => i !== index));
  };

  const updateContentBlock = (index, field, value) => {
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

    if (selectedCategories.length === 0) {
      errorAlert("Please select at least one category.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("contents", JSON.stringify(contents));
    formData.append("categories", JSON.stringify(selectedCategories));

    file.forEach((file) => {
      if (file) {
        formData.append("media", file);
      }
    });

    try {
      let response;
      if (isEditing) {
        response = await axios.put(`${baseUrl}/api/blogs/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await axios.post(`${baseUrl}/api/blogs`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (response.status === 200 || response.status === 201) {
        successAlert(
          isEditing ? "Post updated successfully" : "Post created successfully"
        );
        navigate("/blog");
      }
    } catch (error) {
      errorAlert(isEditing ? "Error updating post" : "Error creating post");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog post title"
            className="mb-4 p-3 border rounded-lg w-full text-lg sm:text-xl font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Categories (Select up to 3)
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, i) => (
                <label
                  key={i}
                  className={`inline-flex items-center p-2 rounded-full cursor-pointer transition-all duration-200
                    ${
                      selectedCategories.includes(category)
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span className="px-2 text-sm">{category}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {contents.map((content, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm">
              <ContentBlock
                type={content.type}
                content={content.text}
                onChange={(field, value) =>
                  updateContentBlock(index, field, value)
                }
                onRemove={() => removeContentBlock(index)}
                handleFileChange={handleFileChange}
                index={index}
                fileRef={(el) => (fileRefs.current[index] = el)}
              />
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 sm:relative sm:border-0 sm:bg-transparent sm:p-0">
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <button
              type="button"
              onClick={addContentBlock}
              className="w-full sm:w-1/2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Add Content Block
            </button>
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              {isEditing ? "Update Post" : "Publish Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogPostEditor;
