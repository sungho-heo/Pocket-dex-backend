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
            // Pokemon은 리스트형태의 데이터 타입을 갖지만 안에 데이터의 경우 number와 string 데이터를 받아오기에 any타입을 설정함.
            const pokemonList = results.map((row) => {
                return {
                    id: row.id,
                    name: row.name,
                    type: row.type,
                };
            });
            resolve(pokemonList);
        });
    });
};
exports.getAllPokemon = getAllPokemon;
