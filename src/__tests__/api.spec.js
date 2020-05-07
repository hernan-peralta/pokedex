import {grabPokemon, navigatePokemons} from '../api.js'

beforeEach(() => {
  global.fetch = jest.fn();
});

test('carga el primer pokemon', () => {
  global.fetch.mockImplementationOnce(() => new Promise((resolve) => {
    const jsonPromise = new Promise((r) => {
      r({});
    });
    resolve({ json: () => jsonPromise });
  }));

  grabPokemon('https://pokeapi.co/api/v2/pokemon/2/');
  expect(global.fetch)
    .toHaveBeenCalledTimes(1);

  expect(global.fetch)
    .toHaveBeenCalledWith(`https://pokeapi.co/api/v2/pokemon/2/`);
});


test('carga la url de la flecha', () => {
  global.fetch.mockImplementationOnce(() => new Promise((resolve) => {
    const jsonPromise = new Promise((r) => {
      r({});
    });
    resolve({ json: () => jsonPromise });
  }));

  navigatePokemons();
  expect(global.fetch)
  .toHaveBeenCalledTimes(1);

  expect(global.fetch)
    .toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1');

})

