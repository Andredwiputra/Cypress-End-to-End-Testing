import { slowCypressDown } from 'cypress-slow-down'
slowCypressDown(1000)

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Login', () => {
  it('passes', () => {
    cy.visit('/')
    cy.contains('Sign In').click()
    cy.url().should('include', '/customer/account/login')
    cy.contains('Customer Login')

    //fill the form
    cy.fixture('loginFixture.json').then((login) => {
      cy.get('input[name="login[username]"]').type(login.email).should('have.value', login.email)
      cy.get('input[name="login[password]"]').type(login.password).should('have.value', login.password)
      cy.get('#login-form').submit()
      cy.url().should('include', '/')
      cy.contains('Welcome, I Made Andre123 Dwi Putra123!')
    })
  })
})