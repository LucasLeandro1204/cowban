import Auth from 'auth';
import Router from 'core/router';

const router = new Router();

export default router.prefix('/api')
  .get('/pong', (req, res) => res.send('Pong!'))
  .use(Auth)
  .build();
