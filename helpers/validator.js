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
