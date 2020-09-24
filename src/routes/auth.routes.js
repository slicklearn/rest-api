import { Router } from 'express';
import * as sesMw from '../middlewares/sessions';
import * as auth from '../controllers/auth.controller';
import * as captcha from '../middlewares/captcha';

const router = Router();

router.post("/login", [sesMw.needGuest, captcha.needVerify], auth.login);
router.post("/register", [sesMw.needGuest, captcha.needVerify], auth.register);
router.get("/logout", sesMw.needLogged, auth.logout);
router.get("/checksession", auth.checkSession);

export default router;