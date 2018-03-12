import { schema } from 'support/helpers';
import Controller from 'auth/controller';
import Authenticated from 'auth/middleware';
import { AuthenticationError } from 'auth/errors';

Controller
  .get('/ping', 'ping')
    .before(Authenticated)
  .post('/login', 'login')
    .before(
      schema({
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
      }))
    .after((err, req, res, next) => {
      throw new AuthenticationError;
    });

export default Controller.setup();
