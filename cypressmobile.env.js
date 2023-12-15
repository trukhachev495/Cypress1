const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 375,
    viewportHeight: 667,
    retries: {
      openMode: 1,
      runMode: 2
    }
  }
})