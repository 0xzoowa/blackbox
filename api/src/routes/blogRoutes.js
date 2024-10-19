const express = require("express");
const { body } = require("express-validator");
const { protect, authorize } = require("../middleware/auth");
const {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const upload = require("../middleware/upload");
const validate = require("../middleware/validate");
const router = express.Router();

router.post(
  "/",
  protect,
  authorize("chief"),
  upload.array("media", 5),
  createBlog
);

router.get("/", getBlogs);

router.put(
  "/:id",
  protect,
  authorize("chief"),
  upload.array("media", 5),
  updateBlog
);

router.delete("/:id", protect, authorize("chief"), deleteBlog);

module.exports = router;
