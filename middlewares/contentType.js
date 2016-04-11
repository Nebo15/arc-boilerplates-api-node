//Content-type middleware for checking if current content-type is acceptable on the server
export default (req, res, next) => {
  if (req.headers['content-type'] !== undefined) {
    let config = require('../config/config');
    let acceptable = false;
    for (let i = 0; i < config.default.acceptedContentTypes.length; i++) {
      if (config.default.acceptedContentTypes[i] === req.headers['content-type']) {
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
