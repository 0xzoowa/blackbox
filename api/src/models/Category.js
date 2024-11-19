const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: [
        "Personal Philosophy",
        "Low Level Programming",
        "Theory",
        "C",
        "Assembly",
        "Random",
      ],
      unique: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
