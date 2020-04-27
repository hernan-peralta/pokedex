let currentPokemonURL = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1';

class Pokemon{
  constructor(resJSON){
    this.name = resJSON.name;
    this.height = resJSON.height;
    this.weight = resJSON.weight;
    this.sprites = resJSON.sprites;
    this.stats = resJSON.stats;
    this.types = resJSON.types;
  }
}


//esta funcion la dejo sin async/await por motivos educativos
export function grabPokemon(url) {
    return fetch(url)
    .then((res) => res.json())
    .then(resJSON => new Pokemon(resJSON))
}


export async function navigatePokemons(url = currentPokemonURL) {
    const res = await fetch(url);
    return await res.json();
}

