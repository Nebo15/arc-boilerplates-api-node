import config from './../config/config';
//Content-type middleware for checking if current content-type is acceptable on the server
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
