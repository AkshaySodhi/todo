import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      return res.status(404).json({ error: "unauthorized ,token not found!" });
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({ error: "invalid token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(404).json({ error: "user not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(`error in protect route`, err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
