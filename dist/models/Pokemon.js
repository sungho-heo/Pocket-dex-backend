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
exports.PokemonService = exports.Pokemon = void 0;
const axios_1 = __importDefault(require("axios"));
// class Pokemon 정의 일일히 다른 포켓몬 데이터 변수를 작성할 필요x.
class Pokemon {
    constructor(id, name, type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }
}
exports.Pokemon = Pokemon;
class PokemonService {
    static getAllPokemon() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get("https://pokeapi.co/api/v2/pokemon");
                const pokemons = response.data.results.map((pokemon) => {
                    return {
                        id: pokemon.id,
                        name: pokemon.name,
                        type: pokemon.type,
                    };
                });
                return pokemons;
            }
            catch (error) {
                console.error("Error fetching Pokemon:", error);
                throw error;
            }
        });
    }
}
exports.PokemonService = PokemonService;
