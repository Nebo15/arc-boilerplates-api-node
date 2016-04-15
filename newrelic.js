//Code is sucks and it does not implement ES6. But this is for newrelic module.
//https://github.com/newrelic/node-newrelic
//Code from camelCase to underscore because we implement ES6 with CamelCase code style
'use strict';
import app_config from './config/config.js';

export let config = {
  agent_enabled: app_config.get('env') === "production",
  app_name: app_config.get('newrelic').get('appName'),
  license_key: app_config.get('newrelic').get('licenseKey')
};
