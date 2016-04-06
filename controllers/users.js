import {Controller} from "../helpers/controller";
import contentType from '../middlewares/contentType';
import UserModel from '../models/user';

export default class UserController extends Controller {
  constructor(basePath) {
    super(basePath);
    super.setPrefix('');

    // Route definitions for this controller
    this.router.all("*", contentType);
    this.router.post('/users/register', (req, res) => {
      UserModel.register(
        new UserModel({username: req.body.username}),
        req.body.password,
        function (err, user) {
          if (err) {
            return res.status(500).json({err: err});
          }
          user.save(function (err, user) {
              res.status(200).json({status: 'Registration Successful!'});
          });
        });
    });

    this.router.get('/logout', (req, res) => {
      req.logout();
      res.status(200).json({
        status: 'Bye!'
      });
    });
  }
}
