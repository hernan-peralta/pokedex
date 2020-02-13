import * as api from './api.js';

export async function grabPokemon(url) {
  const pokemonInMemory = JSON.parse(localStorage.getItem(url));
  if (pokemonInMemory) {
    return pokemonInMemory;
  }

  const pokemon = await api.grabPokemon(url)
  localStorage.setItem(url, JSON.stringify(pokemon));
  return pokemon;
  
}


export async function navigatePokemons(url) {
  const urlInMemory = JSON.parse(localStorage.getItem(url));
  if (urlInMemory) {
        return urlInMemory;
  }
  
  const pokemonURLs = await api.navigatePokemons(url)
  localStorage.setItem(url, JSON.stringify(pokemonURLs));
  return pokemonURLs;

}
