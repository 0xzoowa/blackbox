const express = require("express");
const { protect } = require("../middleware/auth");
const {
  updateProfile,
  updateProfilePicture,
} = require("../controllers/profileController");
const router = express.Router();

router.put("/", protect, updateProfile);
router.put("/picture", protect, updateProfilePicture);

module.exports = router;
