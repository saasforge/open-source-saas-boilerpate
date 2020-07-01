describe('Auth', function () {
  beforeEach( function() {
    cy.visit('/auth/login')
    cy.get('#inputEmail').should('exist').as('Email')
    cy.get('#inputPassword').should('exist').as('Pass')
    cy.get('.btn').should('exist').as('SignIn')
  })

  it('Successfully logs the test user in and out', function () {
    cy.get('@Email').type(Cypress.env('TEST_USER_EMAIL'))
    cy.get('@Pass').type(Cypress.env('TEST_USER_PASS'))
    cy.get('@SignIn').click()
    cy.location('pathname').should('eq','/app/profile')
    cy.get('.button-dropdown-menu').click().then(() => {
      cy.get('div.dropdown-item').click()
    })
    cy.location('pathname').should('eq','/auth/login')
  })

  // TODO: Test registration, confirmation, reset pass, access control, etc.
})