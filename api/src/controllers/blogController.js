const { BlogPost, Content } = require("../models/Blog");
const Category = require("../models/Category");

exports.createBlog = async (req, res) => {
  try {
    console.log("body", req.body);
    console.log("files", req.files);

    const { title, contents, categories } = req.body;
    const parsedContents = JSON.parse(contents);
    const parsedCategories = JSON.parse(categories);
    console.log("pc", parsedCategories);

    // Check if contentArray exists and is an array

    if (!Array.isArray(parsedContents)) {
      return res.status(400).json({
        message: "Invalid content array format",
      });
    }

    if (!Array.isArray(parsedCategories)) {
      return res.status(400).json({
        message: "Invalid data format",
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

    for (const item of parsedCategories) {
      const category = await Category.findOne({ name: item });
      if (category) {
        blog.categoryId.push(category._id);
      } else {
        const newCategory = await Category.create({ name: item });
        blog.categoryId.push(newCategory._id);
      }
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
    console.log("body", req.body);
    console.log("files", req.files);

    const { id } = req.params;
    const { title, contents } = req.body;
    const parsedContents = JSON.parse(contents);

    // Check if contentArray exists and is an array
    if (!Array.isArray(parsedContents)) {
      return res.status(400).json({
        message: "Invalid content array format",
      });
    }

    // Find the blog post
    const blog = await BlogPost.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog post not found" });
    }

    // Check if the user is the author of the blog post
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this blog post",
      });
    }

    // Update the blog title
    blog.title = title;

    // Extract and manipulate files
    const mediaFiles = req.files.map((file) => {
      return {
        path: file.path,
        type: file.mimetype,
      };
    });
    console.log("media files", mediaFiles);
    let fileIndex = 0;

    // Remove existing content
    await Content.deleteMany({ blogId: blog._id });
    blog.content = [];

    // Create new content
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

    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ success: false, message: "Something went wrong." });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogPost.findOne({ _id: id, deleted: false })
      .populate("author", "username")
      .populate("content")
      .populate("categoryId")
      .exec();

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "something went wrong." });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const skip = (page - 1) * limit;

    const totalBlogs = await BlogPost.countDocuments({
      deleted: false,
      archived: false,
    });

    const blogs = await BlogPost.find({ deleted: false, archived: false })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .populate("author", "username")
      .populate("content")
      .populate("categoryId")
      .skip(skip)
      .limit(limit)
      .exec();

    // Calculate total pages
    const totalPages = Math.ceil(totalBlogs / limit);

    // Return paginated data
    return res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        totalBlogs,
        currentPage: page,
        totalPages,
        limit,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: "something went wrong." });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the blog post
    const blog = await BlogPost.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog post not found" });
    }

    // Check if the user is the author of the blog post
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this blog post",
      });
    }

    const deletedContent = await Content.deleteMany({ blogId: blog._id });
    if (!deletedContent.acknowledged) {
      return res
        .status(400)
        .json({ success: false, message: "Error deleting contents." });
    }
    const deletedPost = await BlogPost.deleteOne({ _id: blog._id });
    if (!deletedPost.acknowledged) {
      return res
        .status(400)
        .json({ success: false, message: "Error deleting post." });
    }
    return res.status(200).json({
      success: true,
      message: "Blog post deleted",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ success: false, message: "Something went wrong." });
  }
};

exports.archiveBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the blog post
    const blog = await BlogPost.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog post not found" });
    }

    // Check if the user is the author of the blog post
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this blog post",
      });
    }

    // archive the blog post
    blog.archived = true;
    await blog.save();

    // archive all associated content
    await Content.updateMany({ blogId: blog._id }, { archived: true });

    return res.status(200).json({
      success: true,
      message:
        "Blog post and associated content have been archived successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ success: false, message: "Something went wrong." });
  }
};

exports.deletedBlogPost = async (req, res) => {
  try {
    const blogs = await BlogPost.find({ deleted: true })
      .populate("author", "username")
      .populate({
        path: "content",
      })
      .exec();
    return res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "something went wrong." });
  }
};

exports.archivedBlogPost = async (req, res) => {
  try {
    const blogs = await BlogPost.find({ archived: true })
      .populate("author", "username")
      .populate({
        path: "content",
      })
      .exec();
    return res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "something went wrong." });
  }
};

exports.restoreBlogPost = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the blog post
    const blog = await BlogPost.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog post not found" });
    }

    // Check if the user is the author of the blog post
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this blog post",
      });
    }

    // Soft delete the blog post
    blog.deleted = false;
    await blog.save();

    // Soft delete all associated content
    await Content.updateMany({ blogId: blog._id }, { deleted: false });

    return res.status(200).json({
      success: true,
      message:
        "Blog post and associated content have been restored successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ success: false, message: "Something went wrong." });
  }
};

exports.unarchiveBlogPost = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the blog post
    const blog = await BlogPost.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog post not found" });
    }

    // Check if the user is the author of the blog post
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this blog post",
      });
    }

    // archive the blog post
    blog.archived = false;
    await blog.save();

    // archive all associated content
    await Content.updateMany({ blogId: blog._id }, { archived: false });

    return res.status(200).json({
      success: true,
      message: "Blog post and associated content have been unarchived",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ success: false, message: "Something went wrong." });
  }
};

exports.allCategories = async (req, res) => {
  try {
    const categoryEnumValues = Category.schema.path("name").enumValues;
    res.status(200).json({
      success: true,
      categories: categoryEnumValues,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ success: false, message: "Something went wrong." });
  }
};
