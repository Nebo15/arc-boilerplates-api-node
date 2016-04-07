import newrelic from 'newrelic'; //do not remove this line, it starting newrelic
import db from './helpers/db'; //db connection
import express from 'express' ;
import bodyParser from 'body-parser';
import APIViewEngine from './helpers/APIViewEngine.js';
import config from './config/config.js';
import lusca from 'lusca';
import validator from 'express-validator';
import fs from 'fs';
import logger from 'morgan';
import bugsnag from 'bugsnag';
import path from 'path';
import passport from 'passport';

// Register BugSnag error handler
bugsnag.register(config.bugsnag.apiKey);

// Init our APP
let app = express();

// Authorization Middleware
app.use(passport.initialize());

// Define our API View Engine
app.engine('view.js', APIViewEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'view.js');

// Parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Include controllers
let controllerList = {};
fs.readdirSync(path.join(__dirname, "controllers")).forEach(function (file) {
  if (file.substr(-3) === ".js") {
    let basePath = path.basename(file, ".js");
    let Controller = require(`./controllers/${file}`);
    controllerList[basePath] = new Controller.default(basePath);
    app.use(controllerList[basePath].getPrefix(), controllerList[basePath].router);
  }
});

// Security features
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

// Attack Express Validator
app.use(validator());

// Dev environment tooling
if (config.env === "sandbox") {
  console.log("This is 'sandbox' environment, starting dev tools.");
  app.use(require('errorhandler')());
  app.use(logger('dev'));
} else {
  let accessLogStream = fs.createWriteStream(__dirname + '/var/logs/access.log', {flags: 'a'});
  app.use(logger('short', {stream: accessLogStream}));
  // Integrate BugSnag error handling Middlewares
  app.use(bugsnag.requestHandler);
  app.use(bugsnag.errorHandler);

  // Production Error Handler
  app.use(function (err, req, res, next) {
    var status = err.status || 500;
    res.status(status);
    res.json({
      meta: {
        code: status,
        message: err.message,
        error: {}
      },
      data: {}
    });
  });
}

// Start the server
app.listen(config.server.port, function () {
  console.log('Listening on port ' + config.server.port);
});
