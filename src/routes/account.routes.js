import { Router } from 'express';
import * as sesMw from '../middlewares/sessions';
import * as user from '../controllers/user.controller';

const router = Router();

router.post("/updatepassword", sesMw.needLogged, user.updatePassword);
router.post("/updateusername", sesMw.needLogged, user.updateUsername);

export default router;