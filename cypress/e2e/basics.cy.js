/// <reference types = "Cypress"/>

describe('task page', () => {
  it('It should render the main image ', () => {
    cy.visit('http://localhost:5173/');
    cy.get('.main-header').find('img'); //find can only be used after a get
    cy.get('.main-header img') //this also works as line 6 but if you want to split it 
    //then use line 6
  })

  it('It should include the page title', () =>{
    cy.visit('http://localhost:5173/');
    cy.get('h1').contains('My Cypress Course Tasks');
    cy.contains('No tasks found!');

  })
})