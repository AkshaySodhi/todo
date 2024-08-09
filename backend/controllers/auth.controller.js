import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import genTandSetC from "../utils/genTandSetC.js";

export const signup = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "passwords dont match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();
      genTandSetC(newUser._id, res);
      res.status(201).json(newUser);
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    console.log(`error in signup controller`, err);
    res.status(500).json({ error: "internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const correctPassword = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !correctPassword) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    genTandSetC(user._id, res);
    res.status(200).json(user);
  } catch (err) {
    console.error("error in login contrll: ", err);
    res.status(500).json({ error: "internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      message: "logout suceessful",
    });
  } catch (error) {
    console.error("error in logout contrl", error);
    res.status(500).json({ error: "internal server error" });
  }
};
