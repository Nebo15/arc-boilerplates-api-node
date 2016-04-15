import {VersionGate} from './../helpers/gates.js';

export default class Gate extends VersionGate {
  requestModifier(req, cb) {
    return cb(null, req);
  }
  responseModifier(res, cb) {
    return cb(null, res);
  }
}
