import {VersionGate} from './../helpers/gates';

export default class Gate extends VersionGate {
  static requestMutator(req, cb) {
    return cb(null);
  }

  static responseMutator(data, res, cb) {
    return cb(null);
  }
}
