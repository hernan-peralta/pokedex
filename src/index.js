import { grabPokemon, fetchPokemon } from './fetch.js';
import { renderContent, handleArrowBehaviour, userInteraction } from './ui.js';


async function actualize(url) {
    const urlPokemonData = await fetchPokemon(url);

    if ("next" in urlPokemonData){
        handleArrowBehaviour(urlPokemonData.previous, urlPokemonData.next);
        renderContent(await grabPokemon(urlPokemonData.results[0].url));
    }
    else{
        renderContent(urlPokemonData);
    }
}


function initialize(){
    actualize();
    userInteraction(actualize);
}


initialize();
