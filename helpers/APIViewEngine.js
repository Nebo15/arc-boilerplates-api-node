import fs from 'fs';

export default function APIViewEngine(filePath, options, callback) {
  fs.access(filePath, fs.R_OK, (err) => {
    if(err) {
      return callback(err);
    } else {
      let viewer = require(filePath).default;
      return callback(null, viewer(options));
    }
  });
}
