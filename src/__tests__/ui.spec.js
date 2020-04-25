import fixture from './pokedex.fixture.js'
document.body.innerHTML = fixture
global.Chart = jest.fn()
import pokemon from '../../cypress/fixtures/bulbasaur.json';
import pagina1 from './navegacion-pokemon-1.json'
import pagina2 from './navegacion-pokemon-2.json'
// import { handleArrowBehaviour, renderContent, userInteraction } from '../ui.js'
const ui = require('../ui.js')


test('comportamiento de las flechas de navegación en la pagina 1', () => {
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  ui.handleArrowBehaviour(null, pagina1)

  expect(leftArrow.classList)
    .toContain('disabled')

  expect(rightArrow.classList)
    .not.toContain('disabled')
})


test('ambas flechas disponibles si no es ni el primer ni el ultimo pokemon', () => {
  
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  ui.handleArrowBehaviour(pagina1, pagina2)

  expect(leftArrow.classList)
    .not.toContain('disabled')

  expect(rightArrow.classList)
    .not.toContain('disabled')
})


test('renderiza el pokemon', () => {
  // document.body.innerHTML = fixture
  ui.renderContent(pokemon)

  expect(document.querySelector(".name").innerText)
    .toBe("Bulbasaur")

  expect(document.querySelector('.pokemon-image'))
    .toHaveProperty("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png")

  expect(document.querySelector('.height').innerText)
    .toBe("70 cm")

  expect(document.querySelector('.weight').innerText)
    .toBe("6900 g")

  expect(document.querySelectorAll('.tipo').length)
    .toEqual(2)
  
  expect(document.querySelector('.hp').innerText)
    .toBe(45)

  expect(document.querySelector('.attack').innerText)
    .toBe(49)

  expect(document.querySelector('.speed').innerText)
    .toBe(45)

  expect(document.querySelector('.defense').innerText)
    .toBe(49)

  expect(document.querySelector('.special-attack').innerText)
    .toBe(65)

  expect(document.querySelector('.special-defense').innerText)
    .toBe(65)
})

//este test no sale bien, el click() no da ni bola, pero esta testeado con cypress
/*
test('muestra la espalda del pokemon', () =>{
  // document.body.innerHTML = fixture

console.log('antes', document.querySelector('.pokemon-image').getAttribute('src'))
  document.querySelector('#button-reverse').click()
  console.log('despues', document.querySelector('.pokemon-image').getAttribute('src'))

  const imagenPokemon = document.querySelector('.pokemon-image')

  const ui.userInteraction = jest.fn()

  expect(ui.userInteraction)
    .toBeCalled()

  expect(imagenPokemon)
    .toHaveProperty('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png')

})
*/

//esto esta testeado con cypress
/*
test('funcionalidad del buscador', () =>{

})
*/
