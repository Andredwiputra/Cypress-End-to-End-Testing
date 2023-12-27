import { slowCypressDown } from 'cypress-slow-down'
slowCypressDown(1000)

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Create Address', () => {
  beforeEach(() => {
    cy.login('andredwiputra0413@gmail.com','Password_123')
  })
  it('passes create data', () => {
    cy.visit('/')
    cy.contains('Sign In').click()
    cy.contains('Manage Addresses').click()
    //fill the form
    cy.fixture('addressFixture.json').then((address) => {
      cy.get('input[id="street_1"]').type(address.street1).should('have.value', address.street1)
      cy.get('input[id="city"]').type(address.City).should('have.value', address.City)
      cy.get('[id="country"]').select('Australia', {force: true}).invoke('val').should('eq','AU')
      cy.get('[id="region_id"]').select('New South Wales', {force: true}).invoke('val').should('eq','570')
      cy.get('input[id="zip"]').type(address.Postalcode).should('have.value', address.Postalcode)
      cy.get('input[id="company"]').type(address.Company).should('have.value', address.Company)
      cy.get('input[id="telephone"]').type(address.Phone).should('have.value', address.Phone)
      cy.contains('Save Address').click()
      cy.contains('You saved the address.')
      cy.contains('Address Book')
    })
    
  })
})