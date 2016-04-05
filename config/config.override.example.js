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
    app_name: ['My Application'],
    license_key: 'license key here',
    logging: {
      level: 'info'
    }
  }
}
