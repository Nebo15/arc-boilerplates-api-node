import fs from 'fs';
import moment from 'moment';
import validator from 'node-validator';

let version_header = 'X-API-Version';
let gates_dir = './gates';

function sortMoment(lhs, rhs) {
  lhs = moment(lhs);
  rhs = moment(rhs);
  return lhs.isAfter(rhs) ? 1 : lhs.isBefore(rhs) ? -1 : 0;
}

function requireGate(gate) {
  return require(`./../${gates_dir}/${gate}.js`).default;
}

function getActiveGates(base_version) {
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

  gates_list.sort(sortMoment);

  let gates = {};
  for(let i in gates_list) {
    let g = requireGate(gates_list[i]);

    if(!g) {
      throw `Gate ${gates_list[i]} don't have default export!`;
    }

    if(!g instanceof VersionGate) {
      throw `Gate ${gates_list[i]} doesn't extend VersionGate!`;
    }

    gates[gates_list[i]] = g;
  }

  return gates;
}

export class VersionGate {
  request(req, res, next) {
    return next();
  }

  response(req, res, next) {
    return next();
  }
}

export function gateRequestMiddlewares(app) {
  return getActiveGates('2017-01-01');
}

export function getLatestAPIVersion() {
  return moment().format("YYYY-MM-DD");
}

export function getRequestAPIVersion(req) {
    if (req.headers[version_header] !== undefined) {
      return req.headers[version_header];
      // TODO validate version header
    } else {
      return getLatestAPIVersion();
    }
}

// export gateRequestMiddlewares(app) => {
//   return (req, res, next) => {
//     if (req.headers[version_header] !== undefined) {
//       let config = require('../config/config');
//       let acceptable = false;
//       for (let i = 0; i < config.default.acceptedContentTypes.length; i++) {
//         if (config.default.acceptedContentTypes[i] === req.headers['content-type']) {
//           acceptable = true;
//         }
//       }
//       if (!acceptable) {
//         let err = new Error('Content-type ' + req.headers['content-type'] + ' not acceptable!');
//         err.status = 406;
//         return next(err);
//       }
//     }
//     return next();
//   };
// }
