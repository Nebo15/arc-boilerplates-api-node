/**
 * Validation helper. We use a slightly extended http://json-schema.org/ to describe a request structure.
 *
 * It helps to describe request parameters and auto-generate docs by a simple schema object, keeping docs as
 * close to a controller as possible.
 */

import {Validator} from 'jsonschema';

export function promiseSchemeValidation(data, scheme) {
  data = data || {};

  return new Promise((resolve, reject) => {
    let validationResult = (new Validator).validate(data, scheme);
    if (validationResult.valid) {
      return resolve();
    }

    return reject(validationResult);
  });
}
