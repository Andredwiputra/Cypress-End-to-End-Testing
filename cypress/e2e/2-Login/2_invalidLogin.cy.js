import { slowCypressDown } from 'cypress-slow-down'
slowCypressDown(1000)

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Login', () => {
  it('Login with no input', () => {
    cy.visit('/')
    cy.contains('Sign In').click()
    cy.url().should('include', '/customer/account/login')
    cy.contains('Customer Login')

    //form without input
    cy.fixture('loginFixture.json').then((login) => {
      cy.get('input[name="login[username]"]')
      cy.get('input[name="login[password]"]')
      cy.get('#login-form').submit()
      cy.contains('This is a required field.')
      cy.url().should('include', '/customer/account/login')
    })
  })

  it('Login with false password', () => {
    cy.visit('/')
    cy.contains('Sign In').click()
    cy.url().should('include', '/customer/account/login')
    cy.contains('Customer Login')

    //form without input
    cy.fixture('loginFixture.json').then((login) => {
      cy.get('input[name="login[username]"]').type(login.email).should('have.value', login.email)
      cy.get('input[name="login[password]"]').type(login.password2).should('have.value', login.password2)
      cy.get('#login-form').submit()
      cy.get('.message-error').should('contain.text', 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')
      cy.url().should('include', '/customer/account/login')
    })
  })
})