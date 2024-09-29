const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const media = req.files
      ? req.files.map((file) => ({
          type: file.mimetype.split("/")[0],
          url: file.path,
        }))
      : [];

    const blog = await Blog.create({
      title,
      content,
      author: req.user._id,
      media,
    });

    res.status(201).json(blog);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "something went wrong." });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedData = { title, content };

    if (req.files && req.files.length > 0) {
      const media = req.files.map((file) => ({
        type: file.mimetype.split("/")[0],
        url: file.path,
      }));
      updatedData.media = media;
    }

    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id },
      updatedData,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found or not authorized" });
    }
    res.json(blog);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "something went wrong." });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username");
    res.json(blogs);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "something went wrong." });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
    });
    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found or not authorized" });
    }
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "something went wrong." });
  }
};
