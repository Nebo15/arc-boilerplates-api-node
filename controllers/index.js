import {baseController} from './../helpers/baseController'

export class getController extends baseController {
  onValid(req, res, next) {
    let user = {"id": req.body.user_id ? req.body.user_id : 123, name: "Test", avatar: "http://link", hiddenField: "can't see me!"};

    return this.render(req, res, 'user', user, (err, data) => {
      return res.sendJson(data);
    });
  }
}

// class postIndexСontroller extends baseController {
//   getRequestScheme() {
//     return {
//       "id": "/test",
//       "type": "object",
//       "properties": {
//         "postparam": {"type": "integer"}
//       }
//     };
//   }

//   onValid(req, res, next) {
//     return this.renderView('user', {"user": "lololo"}, (err, data) => {
//       return res.sendJson(data);
//     });
//   }
// }
