let currentPokemonURL = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1';

export function grabPokemon(url) {
    return fetch(url)
    .then((res) => res.json())
}


export async function navigatePokemons(url = currentPokemonURL) {
    const res = await fetch(url);
    return await res.json();
}
