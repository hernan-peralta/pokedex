/// <reference types="Cypress" />

describe('Pokedex', () => {
  let fetchPolyfill;

  before(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';

    cy.request(polyfillUrl)
      .then((response) => {
        fetchPolyfill = response.body;
      });

    cy.server();
    cy.route('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1', 'fixture:pagina-1')
      .as('obtenerPrimeraPagina');

    cy.route('https://pokeapi.co/api/v2/pokemon/1/', 'fixture:bulbasaur')
      .as('cargaBulbasaur')
    cy.visit('http://127.0.0.1:8080', {
      onBeforeLoad(contentWindow) {
        // eslint-disable-next-line no-param-reassign
        delete contentWindow.fetch;
        contentWindow.eval(fetchPolyfill);
        // eslint-disable-next-line no-param-reassign
        contentWindow.fetch = contentWindow.unfetch;
      },
    });
  });


  it('Carga el pokedex en el primer pokemon', () => {

    cy.get('.name')
      .should('have.text', 'Bulbasaur')
  })


  it('Muestra el sprite de la espalda del pokemon', () => {
    cy.get('#button-reverse').click()
    cy.get('.pokemon-image')
      .should('have.attr', 'src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png')
  })


  it('Carga el siguiente pokemon usando la flecha hacia la derecha', () => {
    cy.server();
    cy.route('https://pokeapi.co/api/v2/pokemon/?offset=1&limit=1', 'fixture:pagina-2')
      .as('cargaSegundaPagina')

    cy.route('https://pokeapi.co/api/v2/pokemon/2/', 'fixture:ivysaur')
      .as('cargaIvysaur')
    cy.get('#right-arrow').click()
    cy.get('.name')
      .should('not.have.text', 'Bulbasaur')

  })


  it('Carga el pokemon anterior usando la flecha hacia la izquierda', () => {
    cy.server();
    cy.route('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1', 'fixture:pagina-1')
    cy.route('https://pokeapi.co/api/v2/pokemon/1/', 'fixture:bulbasaur')

    cy.get('#left-arrow').click()
    cy.get('.name')
      .should('have.text', 'Bulbasaur')
  })


  it('Utiliza el buscador introduciendo el nombre de un pokemon', () => {
    cy.server();
    cy.route('https://pokeapi.co/api/v2/pokemon/pikachu', 'fixture:pikachu')
    cy.get('.search').type('Pikachu')
    cy.get('form > input[type=submit]:nth-child(3)').click()
    cy.get('.name')
      .should('have.text', 'Pikachu')
  })

  it('Muestra el grafico de barras de las stats', () => {
    cy.get('#toggle-visibility').click()
    cy.get('#text-stats')
      .should('have.class', 'toggleVisibility')
    cy.get('#canvas')
      .should('not.have.class', 'toggleVisibility')
  })

})
