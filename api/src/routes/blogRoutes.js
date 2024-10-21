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
} = require("../controllers/blogController");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/deleted", protect, authorize("chief"), deletedBlogPost);
router.get("/archived", protect, authorize("chief"), archivedBlogPost);

router.post(
  "/",
  protect,
  authorize("chief"),
  upload.array("media", 5),
  createBlog
);

router.get("/", getBlogs);

router.get("/:id", getBlog);

router.put(
  "/:id",
  protect,
  authorize("chief"),
  upload.array("media", 5),
  updateBlog
);

router.put("/:id/archive", protect, authorize("chief"), archiveBlog);

router.delete("/:id", protect, authorize("chief"), deleteBlog);

module.exports = router;
