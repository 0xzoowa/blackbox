const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * blog flow =>
 * click create post button
 * add title
 * add content
 * save content
 * add content id to blog post
 */

const contentSchema = new Schema(
  {
    blogId: { type: mongoose.Types.ObjectId, ref: "Blog", required: true },
    type: {
      type: String,
      enum: [
        "paragraph",
        "heading",
        "subheading",
        "code",
        "image",
        "audio",
        "video",
      ],
      default: "paragraph",
      required: true,
    },
    text: { type: String, required: true }, //if content type is attachment, this will be a url or path
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.model("Content", contentSchema);

const blogPostSchema = new Schema(
  {
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: [{ type: mongoose.Types.ObjectId, ref: "Content" }],
    archived: { type: Boolean, required: true, default: false },
    deleted: { type: Boolean, required: true, default: false },
    private: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const BlogPost = mongoose.model("BlogPost", blogPostSchema);
module.exports = { BlogPost, Content };
