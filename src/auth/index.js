import Router from 'core/router';
import Login from 'auth/job/login';
import Register from 'auth/job/register';
import Authenticated from 'auth/middleware';
import LoginValidation from 'auth/validate/login';
import RegisterValidation from 'auth/validate/register';
import { AuthenticationError, EmailAlreadyTaken } from 'auth/errors';

const router = new Router();

export default router
  .prefix('/auth')
    .get('/ping', (req, res) => res.send('Pong!'))
      .before(Authenticated)
    .post('/login', Login)
      .validate(LoginValidation)
      .handle(() => {
        throw new AuthenticationError;
      })
    .post('/register', Register)
      .validate(RegisterValidation)
      .handle(() => {
        throw new EmailAlreadyTaken;
      })
  .build();
