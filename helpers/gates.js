import fs from 'fs';
import moment from 'moment';
import config from './../config/config';
import async from 'async';

// Cache FS operation
let gates_cache = {};

function requireGate(gate, dir) {
  dir = dir || config.get('gates').get('dir');
  return require(`${dir}/${gate}.js`).default;
}

function getActiveGates(base_version) {
  if(gates_cache[base_version]) {
    return gates_cache[base_version];
  }

  let gates_dir = config.get('gates').get('dir');
  let gates_list = [];
  let current_moment = moment(base_version);

  let files = fs.readdirSync(gates_dir) || [];
  if(files && files.length > 0) {
    for (let i in files) {
      let gate_name = files[i].split('.');
      if(gate_name.length < 2 || gate_name[1] !== 'js') {
        continue;
      }

      if(current_moment.isAfter(moment(gate_name[0]))) {
        gates_list.push(gate_name[0]);
      }
    }
  }

  gates_list.sort((lhs, rhs) => {
    lhs = moment(lhs);
    rhs = moment(rhs);
    return lhs.isAfter(rhs) ? 1 : lhs.isBefore(rhs) ? -1 : 0;
  });

  let gates = gates_list.map((gate) => {
    let g = requireGate(gate);

    if(!g) {
      throw `Gate ${gate} don't have default export!`;
    }

    if(!g instanceof VersionGate) {
      throw `Gate ${gate} doesn't extend VersionGate!`;
    }

    g.version = gate;

    return g;
  });

  gates_cache[base_version] = gates;

  return gates;
}

function getLatestAPIVersion() {
  return moment().format("YYYY-MM-DD");
}

function getRequestedVersion(req) {
  let version_header = config.get('gates').get('versionHeader');
  let version = req.headers[version_header];

  if (req.headers[version_header] !== undefined) {
    if(!version.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g)) {
      throw "Incorrect API version.";
    }
    return req.headers[version_header];
  } else {
    return getLatestAPIVersion();
  }
}

export class VersionGate {
  static requestMutator(req, cb) {
    return cb(null);
  }

  static responseMutator(data, cb) {
    return cb(null);
  }
}

export function gateRequestMiddleware() {
  return (req, res, next) => {
    let version = getRequestedVersion(req);

    // Get list of request mutator functions
    let request_mutators = getActiveGates(version).map((g) => {
      if(g.requestMutator) {
        return (cb) => {
          g.requestMutator(req, cb);
        }
      }

      return undefined;
    }).filter((g) => {
      return g !== undefined;
    });

    // Apply all mutators
    async.waterfall(request_mutators, (err) => {
      if(err) {
        throw "There was en error while applying one of request gates."
      }

      return next(err);
    });
  };
}

export function gateResponseMutator() {
  return (req, data, done) => {
    let version = getRequestedVersion(req);

    // Get list of response mutator functions
    let response_mutators = getActiveGates(version).map((g) => {
      if(g.responseMutator) {
        return (cb) => {
          g.responseMutator(data, cb);
        }
      }

      return undefined;
    }).filter((g) => {
      return g !== undefined;
    });

    console.log(response_mutators);

    // Apply all mutators
    async.waterfall(response_mutators, (err) => {
      if(err) {
        throw "There was en error while applying one of response gates."
      }

      return done(err, data);
    });
  };
}
