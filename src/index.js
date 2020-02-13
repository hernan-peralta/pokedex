import { navigatePokemons, grabPokemon } from './fetch.js';
import { renderContent, handleArrowBehaviour, userInteraction} from './ui.js';



async function actualize(url) {
    const urlPokemonData = await navigatePokemons(url);
    handleArrowBehaviour(urlPokemonData.previous, urlPokemonData.next);
    // const pokemon = await grabPokemon(urlPokemonData.results[0].url);
    // console.log(pokemon)
    // renderContent(pokemon);
    renderContent(await grabPokemon(urlPokemonData.results[0].url));
}


function renderPage(){
    // const data = userInteraction();
    actualize();
    userInteraction(actualize);
    // actualize(userInteraction());
}


renderPage();
// actualize();
