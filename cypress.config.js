const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://magento.softwaretestingboard.com/',
    downloadsFolder: 'cypress/downloads',
    fixturesFolder: 'cypress/fixtures',
    pageLoadTimeout: 60000,
    viewportHeight: 660,
    viewportWidth: 1000,
    watchForFileChanges: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
