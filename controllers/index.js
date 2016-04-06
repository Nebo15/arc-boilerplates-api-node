import {Controller} from "../helpers/controller";
import contentType from '../middlewares/contentType';

export default class IndexController extends Controller {
  constructor(basePath) {
    super(basePath);
    super.setPrefix('');

    // Route definitions for this controller

    this.router.all("*", contentType);
    this.router.get("/", (req, res) => {
      res.render('user', {"id": 123, name: "Test", avatar: "http://link", hiddenField: "can't see me!"});
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
