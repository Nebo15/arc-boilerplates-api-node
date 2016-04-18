/**
 * Middleware that checks that a Content-Type header is supported by our application.
 */

import config from './../settings/config';

export default (req, res, next) => {
  if (req.headers['content-type'] !== undefined) {
    let acceptable = false;
    for (let i = 0; i < config.get('acceptedContentTypes').count(); i++) {
      if (config.get('acceptedContentTypes').get(i) === req.headers['content-type']) {
        acceptable = true;
      }
    }
    if (!acceptable) {
      let err = new Error('Content-type ' + req.headers['content-type'] + ' not acceptable!');
      err.status = 406;
      return next(err);
    }
  }
  return next();
};
