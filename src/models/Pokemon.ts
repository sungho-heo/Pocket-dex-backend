import axios from "axios";

// type config
export interface PokemonData {
  id: number;
  name: string;
  type: string;
}
// class Pokemon 정의 일일히 다른 포켓몬 데이터 변수를 작성할 필요x.
class Pokemon {
  public id: number;
  public name: string;
  public type: string;

  constructor(id: number, name: string, type: string) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
}

class PokemonService {
  static async getAllPokemon(): Promise<PokemonData[]> {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
      const pokemons: PokemonData[] = await Promise.all(
        response.data.results.map(async (pokemon: any) => {
          const detailResponse = await axios.get(pokemon.url);
          const pokemonDetail: PokemonData = {
            id: detailResponse.data.id,
            name: detailResponse.data.name,
            type: detailResponse.data.types
              .map((type: any) => type.type.name)
              .join(", "),
          };
          return pokemonDetail;
        })
      );
      return pokemons;
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
      throw error;
    }
  }
}

export { Pokemon, PokemonService };
