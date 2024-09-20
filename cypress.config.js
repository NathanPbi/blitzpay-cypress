const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://blitzpay.com.br/',
    chromeWebSecurity: false,
    video: true,
    videoCompression: 32,
    videosFolder: 'cypress/videos', 
    videoUploadOnPasses: false, 
  },
});
