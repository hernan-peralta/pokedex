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
const $toggleTextChart = document.querySelector("#toggle-visibility");
const $textStats = document.querySelector("#text-stats");
const $canvas = document.querySelector("#canvas");
const $buttonReverse = document.querySelector("#button-reverse");
let ctx = document.getElementById('myChart');

function drawChart(array) {
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Speed', 'Special Attack', 'Special Defense'],
            datasets: [{
                data: array,
                label: 'Stats',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            }],
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                }],
            },
        },
    });
    return myChart;
}


function navigatePokemons(url) {
    const urlInMemory = JSON.parse(localStorage.getItem(url));
    if (urlInMemory) {
        currentPokemonURL = urlInMemory;
        handleArrowBehaviour(urlInMemory["previous"], urlInMemory["next"]);
        return grabPokemon(urlInMemory["results"][0]["url"]);
    }
    fetch(url)
        .then(res => res.json())

        .then(responseJSON => {
            localStorage.setItem(url, JSON.stringify(responseJSON));
            currentPokemonURL = responseJSON;
            handleArrowBehaviour(responseJSON.previous, responseJSON.next);
            return grabPokemon(responseJSON["results"][0]["url"]);
        });
}


function grabPokemon(url) {
    const pokemonInMemory = JSON.parse(localStorage.getItem(url));
    if (pokemonInMemory){
        return renderContent(pokemonInMemory);

    }

    fetch(url)
        .then(res => res.json())

        .then(responseJSON => {
            localStorage.setItem(url, JSON.stringify(responseJSON));
            return renderContent(responseJSON);
        });
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


function renderContent(pokemon) {
    
    resetContent();
    $name.innerText = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    $height.innerText = pokemon.height + '0 cm';
    $weight.innerText = pokemon.weight + '00 g';

    for (let i = 0; i < pokemon.types.length; i++) {
        let divTypes = document.createElement('div');
        divTypes.innerText = pokemon.types[i].type.name;
        $types.appendChild(divTypes);
    }

    $pokemonImage.setAttribute('src', pokemon.sprites.front_default);
    $pokemonImage.dataset.backsrc = pokemon.sprites.back_default;

    drawChart([pokemon.stats[5].base_stat, pokemon.stats[4].base_stat, pokemon.stats[3].base_stat, pokemon.stats[0].base_stat, pokemon.stats[2].base_stat, pokemon.stats[1].base_stat]);

    $speed.innerText = pokemon.stats[0].base_stat;
    $specialDefense.innerText = pokemon.stats[1].base_stat;
    $specialAttack.innerText = pokemon.stats[2].base_stat;
    $defense.innerText = pokemon.stats[3].base_stat;
    $attack.innerText = pokemon.stats[4].base_stat;
    $hp.innerText = pokemon.stats[5].base_stat;
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


$toggleTextChart.onclick = function toggleTextChart() {
    $textStats.classList.toggle("toggleVisibility");
    $canvas.classList.toggle("toggleVisibility");
};


$form.onsubmit = function submitForm(event) {
    const pokemonSearch = document.querySelector('.search').value;
    resetContent();
    grabPokemon('https://pokeapi.co/api/v2/pokemon/' + `${pokemonSearch.toLowerCase()}`);
    event.preventDefault();
};


$leftArrow.onclick = function previousPokemon() {
    navigatePokemons(currentPokemonURL["previous"]);
};


$rightArrow.onclick = function nextPokemon() {
    navigatePokemons(currentPokemonURL["next"]);
};


$buttonReverse.onclick = function showPokemonBack() {
    let imgSrc = $pokemonImage.getAttribute('src');
    $pokemonImage.setAttribute('src', $pokemonImage.dataset.backsrc);
    $pokemonImage.dataset.backsrc = imgSrc;
};


navigatePokemons(currentPokemonURL);
