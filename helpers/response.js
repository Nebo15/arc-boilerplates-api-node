import viewEngine from './APIViewEngine';
import {gateResponseMutator} from './../helpers/gates';
import config from './../config/config';

let views_dir = config.get('views').get('dir');
let response_mutator = gateResponseMutator();

export let responseStructure = (req, res, next) => {

  res.renderJson = (view, data, code) => {
    if (res.error.type) {
      res.sendJsonError(res.statusCode, res.error);
    } else {
      viewEngine(`${views_dir}/${view}.view.js`, data, (err, data) => {
        if (!err) {
          response_mutator(req, data, (err) => {
            res.sendJson(data, code);
          });
        }
      });
    }
  };

  res.jsonp = (data, code) => {
    res.sendJson(data, code);
  };

  res.sendJson = (data, code) => {
    return res.status(code || 200).json({
      "meta": {
        "code": code || 200
      },
      data
    });
  };

  res.sendJsonError = (code, error) => {
    res.status(code || 200).json({
      "meta": {
        "code": code || 500,
        error
      },
      "data": {}
    });
  };

  //http://nebo15.github.io/qbill.docs/#errors
  res.addError = (code, type, message) => {
    res.status(code);
    res.error.type = type;
    res.error.message = message;
  };

  res.addInvalidField = (entryType, entryId, rules) => {
    res.error.invalid.push({"entry_type": entryType, "entry_id": entryId, rules});
  };

  res.addInvalidFields = (fields) => {
    res.error.invalid = fields;
  };

  res.error = {
    type: null,
    invalid: [],
    message: null
  };

  return next();
};
