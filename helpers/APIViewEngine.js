import fs from 'fs';

export default function APIViewEngine(filePath, options, callback) {
  fs.access(filePath, fs.R_OK, (err) => {
    if(err) {
      return callback(err);
    } else {
      var viewer = require(filePath).default;
      return callback(null, viewer(options));
    }
  });
}
