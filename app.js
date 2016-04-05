import express from 'express';
import bodyParser from 'body-parser';
import APIViewEngine from './helpers/APIViewEngine.js';
import extend from 'extend';
import config from './config/config.js';
import lusca from 'lusca';
import validator from 'express-validator';
import fs from 'fs';
import logger from 'morgan';
import bugsnag from 'bugsnag';

// Override configs from config.override.js
try {
  var config_override = require('./config/config.override.js');
  extend(config, config_override.default || {});
} catch(ex) {}

bugsnag.register(config.bugsnag.apiKey);
// Init our APP
let app = express();

// Define our API View Engine
app.engine('view.js', APIViewEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'view.js');

app.use(bugsnag.requestHandler);
app.use(bugsnag.errorHandler);

// Parse request body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Include controllers
import controllers from "./controllers";
app.use(controllers);

// Security features
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

// Attack Express Validator
app.use(validator());

// Dev environment tooling
if(config.env === "sandbox") {
  console.log("This is 'sandbox' environment, starting dev tools.");
  app.use(require('errorhandler')());
  app.use(logger('dev'));
} else {
  let accessLogStream = fs.createWriteStream(__dirname + '/var/logs/access.log', {flags: 'a'})
  app.use(logger('short', {stream: accessLogStream}));
}

// Start the server
app.listen(config.server.port, function () {
    console.log('Listening on port ' + config.server.port)
});
