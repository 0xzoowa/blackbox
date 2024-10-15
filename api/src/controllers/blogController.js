const { BlogPost, Content } = require("../models/Blog");

exports.createBlog = async (req, res) => {
  try {
    const { title, contents } = req.body;

    // Check if contentArray exists and is an array
    if (!Array.isArray(contents)) {
      return res.status(400).json({
        message: "Invalid content array format",
      });
    }
    const media = req.files
      ? req.files.map((file) => ({
          type: file.mimetype.split("/")[0],
          url: file.path,
        }))
      : [];

    const blog = await BlogPost.create({
      title,
      author: req.user._id,
    });
    // Iterate through the content array from UI
    for (const contentItem of contents) {
      // Create the content
      const content = await Content.create({
        blogId: blog._id,
        type: contentItem.type,
        text: contentItem.text,
      });
      blog.content.push(content._id);
    }
    await blog.save();

    return res.status(201).json(blog);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: "something went wrong." });
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
    const blogs = await BlogPost.find()
      .populate("author", "username")
      .populate({
        path: "content",
      })
      .exec();
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
