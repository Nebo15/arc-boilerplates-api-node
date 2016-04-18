// This file is required to make NewRelic work.
import app_config from './settings/config.js';

export let config = {
  agent_enabled: app_config.get('env') === "production",
  app_name: app_config.get('newrelic').get('appName'),
  license_key: app_config.get('newrelic').get('licenseKey')
};
