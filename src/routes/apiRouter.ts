import express, { Request, Response } from "express";
import { PokemonService } from "../models/Pokemon";

const router = express.Router();

router.get("/pokemon", async (req: Request, res: Response) => {
  try {
    // db에서 받아온 포켓몬 데이터 가져오기
    const poketmons = await PokemonService.getAllPokemon();
    // 가져온 데이터 보내기
    res.json(poketmons);
  } catch (err) {
    console.error("Error fetching Poketmon", err);
    res.status(500).json({ error: "Failed to fetch Poketmon" });
  }
});

// router.get("/pokemon/:id", async (req: Request, res: Response) => {
//   const id: number = parseInt(req.params.id);
//   try {

//   }
// })

export default router;
