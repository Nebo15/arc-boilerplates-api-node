import {VersionGate} from './../helpers/gates.js';

export default class Gate extends VersionGate {
  static requestModifier(req, cb) {
    return cb(null, req);
  }
  static responseModifier(res, cb) {
    return cb(null, res);
  }
}
