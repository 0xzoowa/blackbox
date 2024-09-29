require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const BlogPost = require("./models/Blog");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const { protect, authorize } = require("./middleware/auth");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const profileRoutes = require("./routes/profileRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", protect, authorize("chief"), blogRoutes);
app.use("/api/profiles", profileRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
