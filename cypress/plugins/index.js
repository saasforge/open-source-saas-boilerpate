const dotenvPlugin = require('cypress-dotenv');

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // CI doesn't use dotenv to pass these for e2e
  config.env.TEST_USER_EMAIL = process.env.TEST_USER_EMAIL;
  config.env.TEST_USER_NAME = process.env.TEST_USER_NAME;
  config.env.TEST_USER_PASS = process.env.TEST_USER_PASS;

  // Check for custom Flask port and set baseUrl (considering dotenv)
  config = dotenvPlugin(config, undefined, true)  
  if( null === config.baseUrl ) {
    const port = Object.prototype.hasOwnProperty.call(config.env, 'FLASK_RUN_PORT') ? config.env.FLASK_RUN_PORT : 5000;
    config.baseUrl = 'http://localhost:' + port;
  }

  return config
}