// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
    cy.session([email, password], () => {
        cy.visit('/')
        cy.contains('Sign In').click()
        cy.url().should('include', '/customer/account/login')
        cy.contains('Customer Login')
        cy.get('input[name="login[username]').type(email).should('have.value', 'andredwiputra0413@gmail.com')
        cy.get('input[name="login[password]"]').type(password).should('have.value', 'Password_123')
        cy.get('#login-form').submit()
        cy.url().should('include', '/')
        cy.contains('Welcome, I Made Andre123 Dwi Putra123!')
    })
})


// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })