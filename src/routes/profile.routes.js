import * as profile from '../controllers/profile.controller';
import { Router } from 'express';

const router = Router();

router.get('/getbyusername/:username', profile.getByUsername);

export default router;