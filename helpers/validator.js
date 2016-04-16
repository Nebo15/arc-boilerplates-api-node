/**
 * Validation helper. We use a slightly extended http://json-schema.org/ to describe a request structure.
 *
 * It helps to describe request parameters and auto-generate docs by a simple schema object, keeping docs as
 * close to a controller as possible.
 */

import {Validator} from 'jsonschema';

export let defaultReject = (err, res) => {
  res.addError(422, 'validation_error', 'some_message');
  res.addInvalidFields(err);
  res.renderJson();
};

export let validate = (rules, fields, res) => {
  return new Promise((resolve, reject) => {
    let v = new Validator;
    let validationResult = v.validate(fields, rules);
    if (validationResult.errors.length > 0) {
      reject(validationResult);
    } else {
      resolve();
    }
  });
};

export function promiseSchemeValidation(data, scheme) {
  data = data || {};

  return new Promise((resolve, reject) => {
    let v = new Validator;
    let validationResult = v.validate(data, scheme);
    if (validationResult.valid) {
      return resolve();
    }

    return reject(validationResult);
  });
}
