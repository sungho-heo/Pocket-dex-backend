import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

// Singnup
export const signup = async (req: Request, res: Response) => {
  const { nickname, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // hash password는 model단에서 처리.
    const user = new User({ nickname, email, password: password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      // token limit time
      expiresIn: "1h",
    });
    res.status(201).json({ token });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid User" }); // 오타 수정
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
    return res.redirect("/");
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
