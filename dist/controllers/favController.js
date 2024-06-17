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
exports.removeFav = exports.addFav = exports.getFav = void 0;
const User_1 = __importDefault(require("../models/User"));
const getFav = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user.id);
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "User not found" });
        }
        console.log("User found:", user);
        res.status(200).json({ fav: user.fav });
    }
    catch (err) {
        console.error("Error fetching favorites:", err);
        res.status(500).json({ message: err.message });
    }
});
exports.getFav = getFav;
const addFav = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pokemonName } = req.body;
    console.log(pokemonName);
    try {
        const user = yield User_1.default.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ message: "User not foind" });
        }
        if (!user.fav.includes(pokemonName)) {
            user.fav.push(pokemonName);
            yield user.save();
        }
        res.status(200).json({ fav: user.fav });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.addFav = addFav;
const removeFav = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pokemonName } = req.params;
    try {
        const user = yield User_1.default.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ message: "User not foind" });
        }
        user.fav = user.fav.filter((name) => name !== pokemonName);
        yield user.save();
        res.status(200).json({ fav: user.fav });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.removeFav = removeFav;
