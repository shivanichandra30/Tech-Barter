import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";
import fs from "fs";
import Problem from "./models/ProblemStatement.js";
import problemRoutes from "./routes/problemRoutes.js";
import solutionRoutes from "./routes/solutions.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/api", problemRoutes);
app.use("/api/submit-solution", solutionRoutes);

/* MONGOOSE SETUP */

const updateDatabase = () => {
  fs.readFile("./data/problems.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    const problems = JSON.parse(data);

    // Clear the existing data in the database
    Problem.deleteMany({})
      .then(() => {
        // Insert new data into the database
        return Problem.insertMany(problems);
      })
      .then(() => {
        console.log("Data inserted successfully");
      })
      .catch((err) => {
        console.error("Error updating database:", err);
      });
  });
};

// Initial update when server starts
updateDatabase();

// Watch the file for changes and update the database accordingly
fs.watchFile("./data/problems.json", (curr, prev) => {
  updateDatabase();
});

const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
    //   ProblemStatements.insertMany(Problem)
  })
  .catch((error) => console.log(`${error} did not connect`));
