let currentPokemonURL = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1';

class Pokemon{
  constructor(name, height, weight, sprites, stats, types){
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.sprites = sprites;
    this.stats = stats;
    this.types = types;
  }
}


//esta funcion la dejo sin async/await por motivos educativos
export function grabPokemon(url) {
    return fetch(url)
    .then((res) => res.json())
    .then(resJSON => new Pokemon(resJSON.name, resJSON.height, resJSON.weight, resJSON.sprites, resJSON.stats, resJSON.types))
}


export async function navigatePokemons(url = currentPokemonURL) {
    const res = await fetch(url);
    return await res.json();
}

