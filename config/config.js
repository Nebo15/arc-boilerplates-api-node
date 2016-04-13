import extend from 'extend';
import Immutable from 'immutable';

var config = {
  env: "sandbox",
  server: {
    port: process.env.PORT || 3000
  },
  acceptedContentTypes: [
    'application/json'
  ],
  bugsnag: {
    apiKey: "your-api-key-here"
  },
  newrelic: {
    appName: ['My Application'],
    licenseKey: "license key here",
    logging: {
      level: "info"
    }
  },
  db: {
    connection: 'mongodb://localhost:27017/test'
  },
  oauth2Grants: ['password', 'refresh_token']
};

try {
  var configOverride = require('./config.override.js');
  extend(config, configOverride.default || {});
} catch (ex) {
  /** */
}

export default Immutable.Map(config);
