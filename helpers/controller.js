import express from 'express';
import bodyParser from 'body-parser';
import validator from 'node-validator';

export class Controller {
  constructor(basePath) {
    this._base = basePath;
    this._router = express.Router();
    this._router.use(bodyParser.json());
    this._validator = validator;
  }

  setPrefix(prefix) {
    this.prefix = prefix;
  }

  validate(rules, fields, next) {
    return new Promise((resolve, reject) => {
      this.validator.run(
        rules,
        fields,
        function (errorCount, errors) {
          if (errorCount) {
            reject(errors);
          } else {
            resolve();
          }
        });
    });
  }

  getPrefix() {
    return this.prefix;
  }

  get validator() {
    return this._validator;
  }

  get base() {
    return this._base;
  }

  get router() {
    return this._router;
  }
}
