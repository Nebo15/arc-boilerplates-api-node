import {renderView, jsonViewController} from './viewController';
import {ERRORS} from './enums/errors';
import promiseSchemeValidation from './schemeValidator';
import {gateResponseMutator} from './gates';

export class baseController {
  static handler(req, res, next) {
    console.log(this);
    let controller = new this(req, res, next);
    return controller.validate(req, res, next);
  }

  // constructor(req, res, next) {
  //   this.req = req;
  //   this.res = res;
  //   this.next = next;

  //   return controller.validate();
  // }

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

    return this.onValid(req, res);
  }

  onInvalid(err, res) {
    res.addInvalidFields(err);
    res.sendError(ERRORS.REQUEST_INVALID);
  }

  onValid() {
    throw new "Undeclared controller function";
  }

  render(req, res, view, data, cb) {
    let response_mutator = gateResponseMutator();
    return renderView(jsonViewController, view, data, () => {
      response_mutator(req, res, data, (err) => {
        cb()
      });
    });
  }
}
