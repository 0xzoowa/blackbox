const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {
    const { bio } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { bio },
      { new: true, runValidators: true }
    );
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "something went wrong." });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const profilePicture = req.file.path;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profilePicture },
      { new: true, runValidators: true }
    );

    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "something went wrong." });
  }
};
