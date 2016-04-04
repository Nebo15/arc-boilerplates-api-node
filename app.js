import express from 'express';
import bodyParser from 'body-parser';
import APIViewEngine from './helpers/APIViewEngine.js';
import extend from 'extend';
import config from './config/config.js';

// Override configs from config.override.js
try {
  var config_override = require('./config/config.override.js');
  extend(config, config_override.default || {});
} catch(ex) {}

// Init our APP
let app = express();

// Define our API View Engine
app.engine('view.js', APIViewEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'view.js');

// Parse request body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Include controllers
import controllers from "./controllers";
app.use(controllers);

// Start the server
app.listen(config.server.port, function() {
  console.log('Listening on port ' + config.server.port)
});

// We can export fields for docs!
// import {ViewStructure as UserViewStructure} from './views/user.view.js';
// console.log(UserViewStructure);
