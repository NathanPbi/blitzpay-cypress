describe('Blitzpay UI Tests', () => {
  const timestamp = Date.now();
  const email = `natan${timestamp}@blitzpay.com.br`;
  const password = '123456';
  const fakeToken = 'fake-jwt-token';

  // Função para tentar o login com retry, até 5 vezes
  function attemptLogin(attempt = 1) {
    if (attempt > 5) {
      throw new Error('Falha ao logar após 5 tentativas');
    }

    cy.intercept('POST', '**/login', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          token: fakeToken
        }
      });
    }).as('mockedLogin');

    // Mock da resposta do reCAPTCHA
    cy.intercept('POST', '**/recaptcha/**', (req) => {
      req.reply({
        statusCode: 200,
        body: { success: true }
      });
    }).as('recaptchaBypass');

    cy.visit('/', { failOnStatusCode: false });

    // Preencher os dados de login novamente
    cy.get('#email').should('be.visible').clear().type(email);
    cy.get('#password').should('be.visible').clear().type(password);
    cy.get('.icon-eye').click();

    // Simula o clique com atraso para o botão de login
    cy.get('.btn').click({ delay: 200, force: true });

    cy.wait('@mockedLogin').then((interception) => {
      if (interception.response.statusCode !== 200) {
        cy.log(`Tentativa de login #${attempt} falhou, tentando novamente...`);
        attemptLogin(attempt + 1); // Tenta novamente
      } else {
        cy.setCookie('auth_token', fakeToken);
        cy.contains('Pesquisa').should('be.visible');
      }
    });
  }

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
    
    // Simula um clique humano com atraso
    cy.get(':nth-child(2) > .auth-button-component > .btn').click({ delay: 200 });
    
    cy.get('#phone').type('55996277657');
    cy.get('#instagram').type('@natangsilv');
    
    // Simula outro clique humano com atraso
    cy.get('.custom-control').click({ delay: 200 });

    cy.intercept('POST', '**/login').as('loginRequest');
    cy.get('[style=""] > .auth-button-component > .btn').click({ delay: 200 });

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
  });

  it('should login using a mock response and inject token', () => {
    cy.wait(2000);
    attemptLogin(); // Inicia o processo de login com retries
  });
});
