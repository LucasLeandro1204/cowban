import JWT from 'core/jwt';
import { Router } from 'express';
import Controller from 'auth/controller';

const router = Router();

router.post('/login', Controller.login());

router.get('/ping', Controller.ping());

export default router;
