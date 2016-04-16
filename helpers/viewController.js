/**
 * This is helper that is used as default API view engine.
 *
 * Why do we add views? There are number of cases when you have a model that store more data than you want to expose
 * in your API. With "JSON View Controller" approach you can list this fields.
 *
 * Also view structure can help to automatically generate docs, because you can keep everything in a single place.
 * In your code. Without making controllers to look to heavy.
 */

import fs from 'fs';

export function jsonViewController(filePath, data, callback) {
  fs.access(filePath, fs.R_OK, (err) => {
    if(err) {
      return callback(err);
    }

    let viewer = require(filePath).default;

    if(!viewer && typeof viewer !== 'function') {
      return callback(new Error(`Can't parse view controller '${filePath}'.`));
    }

    return callback(null, viewer(data));
  });
};

export function renderView(renderFunction, view, data, cb) {
  return renderFunction(view, data, cb);
}
