describe('Inbox', function () {
    beforeEach( function() {
      cy.request('POST', '/api/auth/login', {
        email: Cypress.env('TEST_USER_EMAIL'),
        password:  Cypress.env('TEST_USER_PASS'),
        remember: false})
      cy.visit('/app/inbox')
    })
  
    afterEach( function() {
      cy.request('POST', '/api/auth/logout')
    })
    
    it('Load the InboxUI component successfully', function () {
      cy.location('pathname').should('eq','/app/inbox')
      cy.contains('Your order is shipped!').should('exist')
    })
  })