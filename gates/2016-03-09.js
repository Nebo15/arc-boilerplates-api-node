import {VersionGate} from './../helpers/gates';

export default class Gate extends VersionGate {
  static requestMutator(req, cb) {
    req.body.user_id = "1234";
    return cb(null);
  }

  static responseMutator(data, cb) {
    data.user = data.name + "";
    delete data.name;
    return cb(null);
  }
}
