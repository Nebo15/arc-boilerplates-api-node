import express from 'express';
import contentType from './middlewares/contentType';

import * as indexMethods from './controllers/index';
import * as usersMethods from './controllers/users';

let router = express.Router();
router.all("*", contentType);

router.get("/", indexMethods.getIndex);
router.post("/", indexMethods.postIndex);

router.post("/users/register", usersMethods.createUser);
router.get("/users/logout", usersMethods.logoutUser);

export default router;
