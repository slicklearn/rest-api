import { Router } from 'express';
import * as sesMw from '../middlewares/sessions';
import * as auth from '../controllers/auth.controller';

const router = Router();

router.post("/login", sesMw.needGuest, auth.login);
router.post("/register", sesMw.needGuest, auth.register);
router.get("/logout", sesMw.needLogged, auth.logout);
router.get("/checksession", auth.checkSession);

export default router;