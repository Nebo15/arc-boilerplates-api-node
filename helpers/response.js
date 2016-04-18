/**
 * We override response structure to add some very useful helper function, like JSON View Controller,
 * API versioning via gates and error enumeration.
 *
 * Also we are trying to keep all responses structured in a same way, so your API consumers will always need to parse
 * exactly same structure whenever they parse response string.
 *
 * Additional methods:
 * - sendJson - send JSON response and finish processing request.
 * - sendError - send error to API consumer (should be one of ERRORS enumerators).
 * - setError - set an response error, to send it later.
 * - addInvalidField and addInvalidFields - add validator error message to a "meta.errors.invalid" list.
 */

import config from './../settings/config';
import {ERRORS} from './enums/errors';
import {jsonViewController} from './viewController';
import {gateResponseMutator} from './../helpers/gates';

let viewsDir = config.get('views').get('dir');
let responseMutator = gateResponseMutator();

export let responseStructure = (req, res, next) => {

  res.renderJson = (view, data, code) => {
    if (res.error.type) {
      res.sendJsonError(res.statusCode, res.error);
    } else {
      jsonViewController(`${viewsDir}/${view}.js`, data, (err, data) => {
        if (!err) {
          responseMutator(req, res, data, (err) => {
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
    // use ERRORS here
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
