const { BlogPost, Content } = require("../models/Blog");

exports.createBlog = async (req, res) => {
  try {
    console.log("body", req.body);
    console.log("files", req.files);

    const { title, contents } = req.body;
    const parsedContents = JSON.parse(contents);

    // Check if contentArray exists and is an array

    if (!Array.isArray(parsedContents)) {
      return res.status(400).json({
        message: "Invalid content array format",
      });
    }

    //extract and manipulate files

    const mediaFiles = req.files.map((file) => {
      return {
        path: file.path,
        type: file.mimetype,
      };
    });
    console.log("media files", mediaFiles);
    let fileIndex = 0;

    const blog = await BlogPost.create({
      title,
      author: req.user._id,
    });

    for (const contentItem of parsedContents) {
      let contentData = {
        blogId: blog._id,
        type: contentItem.type,
        text: contentItem.text || "",
      };

      // Handle file uploads for media types

      if (
        ["image", "audio", "video"].includes(contentItem.type) &&
        mediaFiles[fileIndex]
      ) {
        const file = mediaFiles[fileIndex];
        contentData.text = file.path; // Store file path in text field
        fileIndex++;
      }

      // Create the content

      const content = await Content.create(contentData);
      blog.content.push(content._id);
    }
    await blog.save();

    return res.status(201).json({ success: true, data: blog });
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ success: false, data: "something went wrong." });
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

    const blog = await BlogPost.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id },
      updatedData,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Post not found" });
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
