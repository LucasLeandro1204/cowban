import Auth from 'auth';
import { Router } from 'express';

const router = Router();

router.get('/api/ping', (req, res) => {
  res.send('Pong!');
});

router.use('/api/auth', Auth);

export default router;
