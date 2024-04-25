"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPokemon = void 0;
// poketmon db data get module
const db_1 = __importDefault(require("../db"));
const getAllPokemon = () => {
    return new Promise((resolve, reject) => {
        db_1.default.query("SELECT * FROM poketmon", (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results);
        });
    });
};
exports.getAllPokemon = getAllPokemon;
