import Login from 'auth/job/login';
import Register from 'auth/job/register';
import Controller from 'core/controller';
import Authenticated from 'auth/middleware';
import LoginValidation from 'auth/validate/login';
import RegisterValidation from 'auth/validate/register';
import { AuthenticationError, EmailAlreadyTaken } from 'auth/errors';

const controller = new Controller();

controller
  .get('/ping', (req, res) => res.send('Pong!'))
    .before(Authenticated)
  .post('/login', Login)
    .validate(LoginValidation)
    .after((err, req, res, next) => {
      throw new AuthenticationError;
    })
  .post('/register', Register)
    .validate(RegisterValidation)
    .after((err, req, res, next) => {
      console.log('buceta');
      throw new EmailAlreadyTaken;
    });

export default controller.setup();
