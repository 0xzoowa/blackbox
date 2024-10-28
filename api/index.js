require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./src/routes/authRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const profileRoutes = require("./src/routes/profileRoutes");
const errorHandler = require("./src/middleware/errorHandler");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/profiles", profileRoutes);

// Error handling middleware
app.use(errorHandler);

app.get("/", async (req, res) => {res.status(200).json(sucess: true, message: "This is blackbox api by 0xzoowa...")})

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
  console.log("__dirname:", __dirname);
  console.log("path.join result:", path.join(__dirname, "public"));
});
