const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogPostSchema = new Schema(
  {
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    media: [
      {
        type: {
          type: String,
          enum: ["image", "video", "audio", "gif"],
          url: { type: String },
        },
        content: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const BlogPost = mongoose.model("BlogPost", blogPostSchema);
module.exports = BlogPost;
