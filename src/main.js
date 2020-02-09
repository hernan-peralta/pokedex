let currentPokemonURL = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1';
const $form = document.querySelector("form");
const $name = document.querySelector(".name");
const $pokemonImage = document.querySelector(".pokemon-image");
const $height = document.querySelector(".height");
const $weight = document.querySelector(".weight");
const $types = document.querySelector(".types");
const $hp = document.querySelector(".hp");
const $attack = document.querySelector(".attack");
const $speed = document.querySelector(".speed");
const $defense = document.querySelector(".defense");
const $specialAttack = document.querySelector(".special-attack");
const $specialDefense = document.querySelector(".special-defense");
const $leftArrow = document.querySelector(".left-arrow");
const $rightArrow = document.querySelector(".right-arrow");
const $container = document.querySelector(".container");



function navigatePokemons(url) {
    const urlInMemory = JSON.parse(localStorage.getItem(url));
    if (urlInMemory){
        currentPokemonURL = urlInMemory;
        handleArrowBehaviour(urlInMemory["previous"], urlInMemory["next"]);
        return grabPokemon(urlInMemory["results"][0]["url"]);
    }
    fetch(url)
        .then(res => res.json())

        .then(responseJSON =>{
            localStorage.setItem(url, JSON.stringify(responseJSON));
            currentPokemonURL = responseJSON;
            handleArrowBehaviour(responseJSON.previous, responseJSON.next);
            grabPokemon(responseJSON["results"][0]["url"])
        })
}


function grabPokemon(url) {
    const pokemonInMemory = JSON.parse(localStorage.getItem(url));
    if (pokemonInMemory){
        return renderContent(pokemonInMemory.name, pokemonInMemory.height, pokemonInMemory.weight, pokemonInMemory.types, pokemonInMemory.stats, pokemonInMemory.sprites.front_default);
    }

    fetch(url)
        .then(res => res.json())

        .then(responseJSON => {
            localStorage.setItem(url, JSON.stringify(responseJSON));
            renderContent(responseJSON.name, responseJSON.height, responseJSON.weight, responseJSON.types, responseJSON.stats, responseJSON.sprites.front_default);
        })
}


function handleArrowBehaviour(previous, next) {
    if (previous === null){
        $leftArrow.classList.add('disabled');
        $rightArrow.classList.remove('disabled');
    }
    else if (next === null){
        $rightArrow.classList.add('disabled');
        $leftArrow.classList.remove('disabled');
    }
    else {
        $leftArrow.classList.remove('disabled');
        $rightArrow.classList.remove('disabled');
    }
}


function renderContent(name, height, weight, types, stats, imgURL) {
    resetContent();
    $name.innerText = name[0].toUpperCase() + name.slice(1);
    $height.innerText = height + '0 cm';
    $weight.innerText = weight + '00 g';

    for (let i = 0; i < types.length; i++) {
        let divTypes = document.createElement('div');
        divTypes.innerText = types[i].type.name;
        $types.appendChild(divTypes);
    }

    $pokemonImage.setAttribute('src', imgURL);

    $speed.innerText = stats[0].base_stat;
    $specialDefense.innerText = stats[1].base_stat;
    $specialAttack.innerText = stats[2].base_stat;
    $defense.innerText = stats[3].base_stat;
    $attack.innerText = stats[4].base_stat;
    $hp.innerText = stats[5].base_stat;
}


function resetContent() {
    $name.innerText = '';
    $height.innerText = '';
    $weight.innerText = '';
    $types.innerText = '';
    $speed.innerText = '';
    $specialDefense.innerText = '';
    $specialAttack.innerText = '';
    $defense.innerText = '';
    $attack.innerText = '';
    $hp.innerText = '';
}


$form.onsubmit = event =>{
    const pokemonSearch = document.querySelector('.search').value;
    resetContent();
    grabPokemon('https://pokeapi.co/api/v2/pokemon/' + `${pokemonSearch.toLowerCase()}`);
    event.preventDefault();
}


$leftArrow.onclick = function (e) {
    navigatePokemons(currentPokemonURL["previous"]);
}


$rightArrow.onclick = function (e) {
    navigatePokemons(currentPokemonURL["next"]);
}


navigatePokemons(currentPokemonURL);
