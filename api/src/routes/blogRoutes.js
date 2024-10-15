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
  // [
  //   body("title")
  //     .trim()
  //     .isLength({ min: 3 })
  //     .escape()
  //     .withMessage("Title must be at least 3 characters long"),
  //   body("content")
  //     .trim()
  //     .isLength({ min: 10 })
  //     .withMessage("Content must be at least 10 characters long"),
  // ],
  // validate,
  // upload.array("media", 5),
  createBlog
);

router.get("/", getBlogs);

router.put(
  "/:id",
  protect,
  authorize("chief"),
  [
    body("title")
      .optional()
      .trim()
      .isLength({ min: 3 })
      .escape()
      .withMessage("Title must be at least 3 characters long"),
    body("content")
      .optional()
      .trim()
      .isLength({ min: 10 })
      .withMessage("Content must be at least 10 characters long"),
  ],
  validate,
  upload.array("media", 5),
  updateBlog
);

router.delete("/:id", protect, authorize("chief"), deleteBlog);

module.exports = router;
