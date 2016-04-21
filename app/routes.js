import express from 'express';
import contentType from './../middlewares/contentType';
//Temporary comment, remove after arc-authorization
// import {oauth2} from './helpers/oauth2';

import * as indexMethods from './controllers/index';
import * as usersMethods from './controllers/users';

let router = express.Router();

// router.all('/oauth/token', oauth2.grant());

router.all("*", contentType);

router.get("/", indexMethods.getIndex);
router.post("/", indexMethods.postIndex);
router.post("/test", indexMethods.postIndex);

router.post("/users/register", usersMethods.createUser);
router.get("/users/logout", usersMethods.logoutUser);

export default router;
