describe('Blitzpay UI Tests', () => {
  const timestamp = Date.now();
  const email = `natan${timestamp}@blitzpay.com.br`;
  const password = '123456';

  beforeEach(() => {
    cy.visit('/');
    cy.get('.col-6 > .d-grid > .btn').click();
    cy.get('.main').click();
    cy.get('#name').type('Natan G Silva');
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get(':nth-child(3) > .form-wrapper > .show-password-icon > .clear-button > .icon-eye').click();
    cy.get('#confirm_password').type(password);
    cy.get(':nth-child(4) > .form-wrapper > .show-password-icon > .clear-button > .icon-eye').click();
    cy.get(':nth-child(2) > .auth-button-component > .btn').click({ delay: 200 });
    
    cy.get('#phone').type('55996277657');
    cy.get('#instagram').type('@natangsilv');
    cy.get('[style=""] > .auth-button-component > .btn').click({ delay: 200 });
  });

  it('should login successfully', () => {
    cy.get('#email').should('be.visible').clear().type(email);
    cy.get('#password').should('be.visible').clear().type(password);
    cy.get('.icon-eye').click();
    cy.get('.btn').click({ delay: 200 });
    
    // Aguarde até que o elemento "Pesquisa" esteja visível
    cy.contains('Pesquisa').should('be.visible');
  });
});
