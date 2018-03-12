import JWT from 'core/jwt';
import { Router } from 'express';
import Controller from 'auth/controller';

const router = Router();

router.get('/ping', Controller.ping());

export default router;
