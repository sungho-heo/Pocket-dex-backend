import { Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../middleware/authMiddleware";

export const getFav = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    console.log(user.fav);
    res.status(200).json({ fav: user.fav });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const addFav = async (req: AuthRequest, res: Response) => {
  const { pokemonName } = req.body;
  console.log(pokemonName);

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not foind" });
    }
    if (!user.fav.includes(pokemonName)) {
      user.fav.push(pokemonName);
      await user.save();
    }

    res.status(200).json({ fav: user.fav });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const removeFav = async (req: AuthRequest, res: Response) => {
  const { pokemonName } = req.params;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not foind" });
    }

    user.fav = user.fav.filter((name) => name !== pokemonName);
    await user.save();

    res.status(200).json({ fav: user.fav });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
