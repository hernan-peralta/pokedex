let currentPokemonURL = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1';

export function grabPokemon(url) {
    return fetch(url)
    .then((res) => res.json())
    // .then((responseJSON) => {
    //   responseJSON;
    // });

}


export function navigatePokemons(url = currentPokemonURL) {
    return fetch(url)
      .then((res) => res.json())
    //     .then((responseJSON) => {
    //  responseJSON;
    //   });
}