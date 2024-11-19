const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  archiveBlog,
  deletedBlogPost,
  archivedBlogPost,
  restoreBlogPost,
  unarchiveBlogPost,
  allCategories,
} = require("../controllers/blogController");
const upload = require("../middleware/upload");
const router = express.Router();

// get all deleted blog posts
router.get("/deleted", protect, authorize("chief"), deletedBlogPost);

// get all archived blog posts
router.get("/archived", protect, authorize("chief"), archivedBlogPost);

// get all categories
router.get("/categories", allCategories);

//get all blog posts
router.get("/", getBlogs);

//get blog post by id
router.get("/:id", getBlog);

/**
 * create a new blog post :
 * currently doesnt handle video and audio file formats only images (max of 5 images per post)
 */
router.post(
  "/",
  protect,
  authorize("chief"),
  upload.array("media", 5),
  createBlog
);

/**
 * update blog post :
 * non-functional need to fix this
 */
router.put(
  "/:id",
  protect,
  authorize("chief"),
  upload.array("media", 5),
  updateBlog
);

// archive blog post
router.put("/:id/archive", protect, authorize("chief"), archiveBlog);

// unarchive blog post
router.put("/:id/unarchive", protect, authorize("chief"), unarchiveBlogPost);

// restore blog post
router.put("/:id/restore", protect, authorize("chief"), restoreBlogPost);

// soft delete blog post
router.delete("/:id", protect, authorize("chief"), deleteBlog);

module.exports = router;
