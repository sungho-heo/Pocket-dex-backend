import axios from "axios";

// type config
export interface PokemonData {
  id: number;
  name: string;
  type: string;
  sprites: string;
}
// class Pokemon 정의 일일히 다른 포켓몬 데이터 변수를 작성할 필요x.
class Pokemon {
  public id: number;
  public name: string;
  public type: string;
  public sprites: string;

  constructor(id: number, name: string, type: string, sprites: string) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.sprites = sprites;
  }
}

class PokemonService {
  static async getAllPokemon(): Promise<PokemonData[]> {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=100"
      );
      const pokemons: PokemonData[] = await Promise.all(
        response.data.results.map(async (pokemon: any) => {
          // 포켓몬 api데이터에 각 포켓몬의 상세한 데이터는 url데이터에 파고 들어가야함.
          const detailResponse = await axios.get(pokemon.url);
          const pokemonDetail: PokemonData = {
            id: detailResponse.data.id,
            sprites: detailResponse.data.sprites.other.home,
            name: detailResponse.data.name,
            // 포켓몬 타입은 여러개가 존재해서 여러개 일때 ,를 붙여서 옆에 또다른 타입을 넣어줌.
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
