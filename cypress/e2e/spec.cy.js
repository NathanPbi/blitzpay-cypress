describe('Blitzpay UI Tests', () => {
  const timestamp = Date.now();
  const email = `natan${timestamp}@blitzpay.com.br`;
  const password = '123456';
  const fakeToken = 'fake-jwt-token';

  it('should register a new user', () => {
    cy.visit('/', { failOnStatusCode: false });

    cy.url().should('include', '/');

    cy.get('.main').click();
    cy.get('#name').type('Natan G Silva');
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get(':nth-child(3) > .form-wrapper > .show-password-icon > .clear-button > .icon-eye').click();
    cy.get('#confirm_password').type(password);
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

  it('should login using a mock response and inject token', () => {
    cy.wait(2000);

    cy.intercept('POST', '**/login', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          token: fakeToken
        }
      });
    }).as('mockedLogin');

    cy.visit('/', { failOnStatusCode: false });
    cy.get('#email').should('be.visible').type(email);
    cy.get('#password').should('be.visible').type(password);
    cy.get('.icon-eye').click();
    cy.get('.btn').click({ force: true });

    cy.wait('@mockedLogin').then(() => {
      cy.setCookie('auth_token', fakeToken);

      cy.visit('https://staging.blitzpay.com.br/pesquisa', { failOnStatusCode: false });

      cy.contains('Pesquisa').should('be.visible');
    });
  });
});
