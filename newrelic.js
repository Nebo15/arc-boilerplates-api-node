//Code is sucks and it does not implement ES6. But this is for newrelic module.
//https://github.com/newrelic/node-newrelic
//Code from camelCase to underscore because we implement ES6 with CamelCase code style
'use strict';
import configuration from './config/config.js';

export let config = {
  app_name: configuration.get('newrelic').appName,
  license_key: configuration.get('newrelic').licenseKey
};
