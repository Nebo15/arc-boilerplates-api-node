import {VersionGate} from './../helpers/gates.js';

export default class Gate extends VersionGate {
  request(req, cb) {
    req.body.username = req.body.login;
    delete req.body.login;

    return req;
  }

  response(res, cb) {
    res.body.login = res.body.username;
    delete res.body.username;

    return res;
  }
}
