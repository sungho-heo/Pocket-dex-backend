import express, { Request, Response } from "express";
import morgan from "morgan";
import pokemonRouter from "./routes/apiRouter";

const app = express();
const PORT = process.env.PORT || 3000;

// server log http status code
app.use(morgan("dev"));

// router
app.use("/api", pokemonRouter);

// home
app.get("/", (req, res) => {
  res.send("hello world");
});

// server start
app.listen(PORT, () => {
  console.log(`✅ Server running: http://localhost:${PORT}`);
});
