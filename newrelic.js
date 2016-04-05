//Code is sucks and it does not implement ES6. But this is for newrelic module.
//https://github.com/newrelic/node-newrelic
//Code from camelCase to underscore because we implement ES6 with CamelCase code style
'use strict';
import config from './config/config.js';
config.newrelic.app_name = config.newrelic.appName;
config.newrelic.license_key = config.newrelic.licenseKey;
exports.config = config.newrelic;