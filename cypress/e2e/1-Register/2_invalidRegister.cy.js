import { slowCypressDown } from 'cypress-slow-down'
slowCypressDown(1000)

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Invalid Register', () => {
  it('Register without fill data', () => {
    //redirect url
    cy.visit('/')
    cy.contains('Create an Account').click()
    cy.url().should('include', '/customer/account/create')

    //click submit
    cy.get('#form-validate').submit()
    cy.contains('This is a required field.')
    cy.url().should('include', '/customer/account/create') 
  })

  it('Invalid fill data', () => {
    //redirect url
    cy.visit('/')
    cy.contains('Create an Account').click()
    cy.url().should('include', '/customer/account/create')

    //fill form
    cy.fixture('registerFixture.json').then((regist) => {
      //fill email without @
      cy.get('input[name="email"]').type(regist.email2).should('have.value', regist.email2)
      
      //fill password and different confirm password
      cy.get('input[id="password"]').type(regist.password).should('have.value', regist.password)
      cy.get('input[name="password_confirmation"]').type(regist.password3).should('have.value', regist.password3)
      cy.get('#form-validate').submit()

      //validation
      cy.contains('Please enter a valid email address (Ex: johndoe@domain.com).')
      cy.contains('Please enter the same value again.')
    })
  })

  it('Register same data', () => {
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
      cy.get('.message-error').should('contain.text', 'There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account.')
      cy.url().should('include', '/customer/account/')
    })
  })
})