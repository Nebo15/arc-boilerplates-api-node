import express from 'express';
import contentType from './middlewares/contentType';
import {oauth2} from './helpers/oauth2';

import * as indexMethods from './controllers/index';
import * as usersMethods from './controllers/users';

let router = express.Router();

router.all('/oauth/token', oauth2.grant());

router.all("*", contentType);

router.get("/", oauth2.authorise(), indexMethods.getIndex);
router.post("/", indexMethods.postIndex);
router.post("/test", oauth2.authorise(), indexMethods.postIndex);

router.post("/users/register", usersMethods.createUser);
router.get("/users/logout", usersMethods.logoutUser);

export default router;
