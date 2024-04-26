"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Pokemon_1 = require("./models/Pokemon");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.get("/api/pokemon", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // db에서 받아온 포켓몬 데이터 가져오기
        const poketmon = yield (0, Pokemon_1.getAllPokemon)();
        // 가져온 데이터 보내기
        res.json(poketmon);
    }
    catch (err) {
        console.error("Error fetching Poketmon", err);
        res.status(500).json({ error: "Failed to fetch Poketmon" });
    }
}));
app.listen(PORT, () => {
    console.log("Server is running on port ${PORT} ");
});