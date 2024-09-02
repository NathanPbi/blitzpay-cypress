describe('Blitzpay ui spec', () => {
  it('passes', () => {
    cy.visit('/');
    cy.get('.navbar');
    cy.get('.col-6 > .d-grid > .btn');
  });

  describe('Ui Signup', () => {
    it('Fill in registration fields', () => {

      cy.visit('https://app.blitzpay.com.br/cadastro');
      cy.wait(1000);

      cy.get('#name').type('Natan G Silva');
      cy.get('#email').type('natan.test89@blitz.com');
      cy.get('#password').type('123456');
      cy.get(':nth-child(3) > .form-wrapper > .show-password-icon > .clear-button > .icon-eye').click();
      cy.get('#confirm_password').type('123456');
      cy.get(':nth-child(4) > .form-wrapper > .show-password-icon > .clear-button > .icon-eye').click();
      cy.get(':nth-child(2) > .auth-button-component > .btn').click();
      cy.get('#phone').type('55996277657');
      cy.get('#instagram').type('@natangsilv');
      cy.get('.custom-control').click();
      cy.get('[style=""] > .auth-button-component > .btn').click();

      it('Navigator', () => {
        cy.wait(1000);
        cy.visit('https://app.blitzpay.com.br/login?path=%2F');
        cy.get('#email').type('natan.test89@blitz.com');
        cy.get('#password').type('123456');
        cy.get('.icon-eye').click();
        cy.get('[style=""] > .auth-button-component > .btn').click();
        cy.visit('https://app.blitzpay.com.br/login?path=%2Fpesquisa');
      });
    });
  });
});

