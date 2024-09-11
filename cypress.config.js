const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://staging.blitzpay.com.br/login/',
    chromeWebSecurity: false,
  },
});
