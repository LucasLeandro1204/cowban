import Login from 'auth/job/login';
import Register from 'auth/job/register';
import Controller from 'core/controller';
import Authenticated from 'auth/middleware';
import { AuthenticationError, EmailAlreadyTaken } from 'auth/errors';

const controller = new Controller();

controller
  .get('/ping', (req, res) => res.send('Pong!'))
    .before(Authenticated)
  .post('/login', Login)
    .validate({
      email: {
        in: ['body'],
        exists: true,
        isEmail: true,
        errorMessage: 'Email field is required and should be valid',
      },
      password: {
        in: ['body'],
        exists: true,
        errorMessage: 'Password field is required',
      },
    })
    .after((err, req, res, next) => {
      throw new AuthenticationError;
    })
  .post('/register', Register)
    .validate({
      name: {
        in: ['body'],
        exists: true,
        errorMessage: 'Name field is required and should contain only letters',
      },
      email: {
        in: ['body'],
        exists: true,
        isEmail: true,
        errorMessage: 'Email field is required and should be valid',
      },
      password: {
        in: ['body'],
        exists: true,
        errorMessage: 'Password field is required',
      },
    })
    .after((err, req, res, next) => {
      throw new EmailAlreadyTaken;
    });

export default controller.setup();
