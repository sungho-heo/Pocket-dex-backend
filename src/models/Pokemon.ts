// poketmon db data get module
import connection from "../db";
import mysql from "mysql";

// type config
export interface Pokemon {
  id: number;
  name: string;
  type: string;
}

export const getAllPokemon = (): Promise<Pokemon[]> => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM poketmon",
      (err: mysql.MysqlError, results: any) => {
        if (err) {
          reject(err);
          return;
        }
        // Pokemon은 리스트형태의 데이터 타입을 갖지만 안에 데이터의 경우 number와 string 데이터를 받아오기에 any타입을 설정함.
        const pokemonList: Pokemon[] = results.map((row: any) => {
          return {
            id: row.id,
            name: row.name,
            type: row.type,
          };
        });
        resolve(pokemonList);
      }
    );
  });
};
