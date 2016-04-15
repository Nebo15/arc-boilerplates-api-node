import {VersionGate} from './../helpers/gates';

export default class Gate extends VersionGate {
  static requestMutator(req, cb) {
    req.body.user_id = "modified_id_1234";
    return cb(null);
  }

  static responseMutator(data, res, cb) {
    data.user = data.name;
    delete data.name;

    return cb(null);
  }
}
