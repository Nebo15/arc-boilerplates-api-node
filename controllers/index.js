import * as validation from '../helpers/validator';

export let getIndex = (req, res) => {
  res.renderJson('user', {"id": req.body.user_id ? req.body.user_id : 123, name: "Test", avatar: "http://link", hiddenField: "can't see me!"});
};

export let postIndexValidation = {
  "id": "/test",
  "type": "object",
  "properties": {
    "postparam": {"type": "integer"}
  }
};

export let postIndex = (req, res) => {
  validation.validate(postIndexValidation, req.body, res)
    .then(
      () => {
        res.sendJson(req.app.get('config'));
      },
      (err) => validation.defaultReject(err, res)
    );
};


// New style for controller

function promiseSchemeValidation(data, scheme) {
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

import {renderView, jsonViewController} from '../viewController';

class baseController {
  static getCallback(req, res, next) {
    let controller = new this(req, res, next);
    return controller.validateRequest(req, res, next);
  }

  getRequestScheme() {
    return null;
  }

  validateRequest(req, res, next) {
    let scheme = this.getRequestScheme();

    if(scheme) {
      return promiseSchemeValidation(req.body, scheme)
        .then(() => this.onValid(req, res, next))
        .catch((err) => this.onInvalid(err, res));
    }

    return this.handle(req, res);
  }

  onInvalid(err, res) {
    res.setError(ERRORS.REQUEST_INVALID);
    res.addInvalidFields(err);
    res.renderJson();
  }

  onValid() {
    throw new "Undeclared controller function";
  }

  render(view, data, cb) {
    return renderView(jsonViewController, view, data, cb);
  }
}

class postIndexСontroller extends baseController {
  getRequestScheme() {
    return {
      "id": "/test",
      "type": "object",
      "properties": {
        "postparam": {"type": "integer"}
      }
    };
  }

  onValid(req, res, next) {
    return this.renderView('user', {"user": "lololo"}, (err, data) => {
      return res.sendJson(data);
    });
  }
}
