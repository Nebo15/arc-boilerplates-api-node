export default {
  env: "production",
  server: {
    port: 3001
  },
  acceptedContentTypes: [
    'application/json'
  ],
  bugsnag: {
    apiKey: "your-api-key-here"
  },
  newrelic: {
    appName: ['My Application'],
    licenseKey: 'license key here',
    logging: {
      level: 'info'
    }
  },
  db: {
    connection: 'mongodb://localhost:27017/test'
  }
};
