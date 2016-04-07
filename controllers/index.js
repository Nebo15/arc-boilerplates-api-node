import {Controller} from "../helpers/controller";
import contentType from '../middlewares/contentType';

export default class IndexController extends Controller {
  constructor(basePath, config) {
    super(basePath, config);
    super.setPrefix('');

    // Route definitions for this controller

    this.router.all("*", contentType);
    this.router.route("/")
      .get(
        (req, res) => {
          res.render('user', {"id": 123, name: "Test", avatar: "http://link", hiddenField: "can't see me!"});
        })
      .post(
        (req, res) => {
          let validationRules = this.validator.isObject().withRequired('postparam', this.validator.isNumber());
          this.validate(validationRules, req.body)
            .then(
              () => {
                res.json(this.config);
              },
              (err) => {
                res.json(err);
              }
            );
        });

    this.router.route("/test")
      .all((req, res, next) => {
        let a = "Route description";
        next(a);
      })
      .get((a, req, res, next) => {
        res.end(a);
      });
  }
}
