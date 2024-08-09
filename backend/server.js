import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";

import postRoutes from "./routes/post.routes.js";
import authRoutes from "./routes/auth.routes.js";
import connectToDB from "./connectToDB.js";
import protectRoute from "./middleware/protectRoute.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api/posts", protectRoute, postRoutes);
app.use("/api/auth", authRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  connectToDB();
  console.log(`listening at ${PORT}`);
});
