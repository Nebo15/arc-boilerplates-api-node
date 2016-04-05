/**
 * Content-type middleware for checking if current content-type is acceptable on the server
 */
'use strict';
export default function (req, res, next) {
  if (req.headers['content-type'] != undefined) {
    var config = require('../config/config');
    var acceptable = false;
    for (var i = 0; i < config.default.acceptedContentTypes.length; i++) {
      if (config.default.acceptedContentTypes[i] == req.headers['content-type']) {
        acceptable = true;
      }
    }
    if (!acceptable) {
      var err = new Error('Content-type ' + req.headers['content-type'] + ' not acceptable!');
      err.status = 406;
      return next(err);
    }
  }
  next();
}