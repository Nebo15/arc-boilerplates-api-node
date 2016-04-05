import extend from 'extend';

var config = {
  env: "sandbox",
  server: {
    port: process.env.PORT || 3000
  },
  bugsnag: {
    apiKey: "your-api-key-here"
  },
  newrelic: {
    app_name: ['My Application'],
    license_key: 'license key here',
    logging: {
      level: 'info'
    }
  }
};

try {
  var config_override = require('./config.override.js');
  extend(config, config_override.default || {});
} catch(ex) {}

export default config
