describe('Blitzpay UI Tests', () => {
  const timestamp = Date.now();
  const email = `natan${timestamp}@blitzpay.com.br`;

  it('should load the homepage', () => {
    cy.visit('/' , { failOnStatusCode: false });
    cy.get('.main').click();
    cy.get('#name').type('Natan G Silva');
    cy.get('#email').type(email);
    cy.get('#password').type('123456');
    cy.get(':nth-child(3) > .form-wrapper > .show-password-icon > .clear-button > .icon-eye').click();
    cy.get('#confirm_password').type('123456');
    cy.get(':nth-child(4) > .form-wrapper > .show-password-icon > .clear-button > .icon-eye').click();
    cy.get(':nth-child(2) > .auth-button-component > .btn').click();
    cy.get('#phone').type('55996277657');
    cy.get('#instagram').type('@natangsilv');
    cy.get('.custom-control').click();
    cy.intercept('POST', '**/login').as('loginRequest');
    cy.get('[style=""] > .auth-button-component > .btn').click();
    cy.wait('@loginRequest').then((interception) => {
    expect(interception.response.statusCode).to.eq(200);
   });
  });

 it('should login with the registered user', () => {
  cy.wait(1000); 

   cy.visit('/', { failOnStatusCode: false });
   cy.get('#email').type(email);
   cy.get('#password').type('123456');
   cy.get('.icon-eye').click();
   cy.get('.btn').click({ force: true });

   // Verifica se a URL inclui '/onboarding'
   cy.url().should('include', '/onboarding');
  });
});
