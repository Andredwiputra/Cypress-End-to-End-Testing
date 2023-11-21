import { slowCypressDown } from 'cypress-slow-down'
slowCypressDown(1000)

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Register', () => {
  it('Valid Register', () => {
    //redirect url
    cy.visit('/')
    cy.contains('Create an Account').click()
    cy.url().should('include', '/customer/account/create')

    //fill the form
    cy.fixture('registerFixture.json').then((regist) => {
      cy.get('input[name="firstname"]').type(regist.firstname).should('have.value', regist.firstname)
      cy.get('input[name="lastname"]').type(regist.lastname).should('have.value', regist.lastname)
      cy.get('input[name="email"]').type(regist.email).should('have.value', regist.email)
      cy.get('input[id="password"]').type(regist.password).should('have.value', regist.password)
      cy.get('input[name="password_confirmation"]').type(regist.password2).should('have.value', regist.password2)
      cy.get('#form-validate').submit()
      cy.get('.message-success').should('contain.text', 'Thank you for registering with Main Website Store.')
      cy.url().should('include', '/customer/account/')
    })
  })
})