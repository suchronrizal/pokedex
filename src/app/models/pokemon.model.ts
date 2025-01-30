export interface Pokemon {
  name: string;
  image: string;
  url: string;
  types: string[];
}

export interface PokemonDetail {
  name: string;
  sprites: {
    front_default: string;
  };
  species: { url: string };
  types: PokemonTypes[];
  abilities: string[];
}

export enum PokemonType {
  Grass = 'Grass',
  Fire = 'Fire',
  Water = 'Water',
  Electric = 'Electric',
  Psychic = 'Psychic',
  Ice = 'Ice',
  Fighting = 'Fighting',
  Normal = 'Normal',
  Ground = 'Ground',
  Rock = 'Rock',
}

export interface PokemonTypes {
  type: {
    name: string;
  };
}
