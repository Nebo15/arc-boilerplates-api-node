#!/usr/bin/env node
import app from '../app';

/**
 * Get port from environment and store in Express.
 */

let port = app.get('config').get('server').port;
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port, function () {
  console.log('Listening on port ' + port);
});