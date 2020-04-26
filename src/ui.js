const $name = document.querySelector('.name');
const $pokemonImage = document.querySelector('.pokemon-image');
const $height = document.querySelector('.height');
const $weight = document.querySelector('.weight');
const $types = document.querySelector('.types');
const $hp = document.querySelector('.hp');
const $attack = document.querySelector('.attack');
const $speed = document.querySelector('.speed');
const $defense = document.querySelector('.defense');
const $specialAttack = document.querySelector('.special-attack');
const $specialDefense = document.querySelector('.special-defense');
const $textStats = document.querySelector('#text-stats');
const $canvas = document.querySelector('#canvas');
const ctx = document.getElementById('myChart');
const $toggleTextChart = document.querySelector('#toggle-visibility');
const $buttonReverse = document.querySelector('#button-reverse');
const $leftArrow = document.querySelector('.left-arrow');
const $rightArrow = document.querySelector('.right-arrow');
const $form = document.querySelector('form');


function drawChart(array) {
  const myChart = new Chart(ctx, {
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


export function handleArrowBehaviour(previous, next) {
  $leftArrow.dataset.url = previous;
  $rightArrow.dataset.url = next;

  if (previous === null) {
    $leftArrow.classList.add('disabled');
    $rightArrow.classList.remove('disabled');
  }
  else if (next === null) {
    $rightArrow.classList.add('disabled');
    $leftArrow.classList.remove('disabled');
  }
  else {
    $leftArrow.classList.remove('disabled');
    $rightArrow.classList.remove('disabled');
  }
}


export function renderContent(pokemon) {
  resetContent();
  $name.innerText = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  $height.innerText = pokemon.height + '0 cm';
  $weight.innerText = pokemon.weight + '00 g';

  for (let i = 0; i < pokemon.types.length; i++) {
      let divTypes = document.createElement('div');
      divTypes.classList.add("tipo");
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


function toggleTextChart() {
  $textStats.classList.toggle('toggleVisibility');
  $canvas.classList.toggle('toggleVisibility');
}


export function userInteraction(callback){

  $rightArrow.addEventListener("click", () =>{
    callback($rightArrow.dataset.url);
  })

  $leftArrow.addEventListener("click", () =>{
    callback($leftArrow.dataset.url);
  })

  $toggleTextChart.addEventListener("click", () => {
    toggleTextChart()
  });

  $buttonReverse.addEventListener("click", () => {
    showPokemonBack()
  })

  $form.addEventListener("submit", ()=>{
    const pokemonSearch = document.querySelector('.search').value;
    event.preventDefault();
    callback('https://pokeapi.co/api/v2/pokemon/' + `${pokemonSearch.toLowerCase()}`);
  })
}


function showPokemonBack() {
  const imgSrc = $pokemonImage.getAttribute('src');
  $pokemonImage.setAttribute('src', $pokemonImage.dataset.backsrc);
  $pokemonImage.dataset.backsrc = imgSrc;
}

