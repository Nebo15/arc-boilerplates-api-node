import {renderView, jsonViewController} from './viewController';
import {ERRORS} from './enums/errors';
import promiseSchemeValidation from 'validator';

class baseController {
  static onReqest(req, res, next) {
    let controller = new this(req, res, next);
    return controller.validate(req, res, next);
  }

  getRequestScheme() {
    return null;
  }

  validate(req, res, next) {
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
    res.sendError();
  }

  onValid() {
    throw new "Undeclared controller function";
  }

  render(view, data, cb) {
    return renderView(jsonViewController, view, data, cb);
  }
}
