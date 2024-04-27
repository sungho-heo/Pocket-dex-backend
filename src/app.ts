import express, { Request, Response } from "express";
import { PokemonService, Pokemon } from "./models/Pokemon";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/pokemon", async (req: Request, res: Response) => {
  try {
    // db에서 받아온 포켓몬 데이터 가져오기
    const poketmon: Pokemon[] = await PokemonService.getAllPokemon();
    // 가져온 데이터 보내기
    res.json(poketmon);
  } catch (err) {
    console.error("Error fetching Poketmon", err);
    res.status(500).json({ error: "Failed to fetch Poketmon" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running: http://localhost:${PORT}`);
});
