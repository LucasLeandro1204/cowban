import JWT from 'core/jwt';
import Hash from 'core/hash';
import User from 'model/user';
import { wrap } from 'support/helpers';
import { schema } from 'support/helpers';
import Authenticated from 'auth/middleware';
import { AuthenticationError } from 'auth/errors';

class AuthController {
  static login () {
    return [
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
      }),
      wrap(async ({ validated: { email, password } }, res) => {
        try {
          const user = await User.query().findOne({
            email,
          }).throwIfNotFound();

          const valid = await Hash.compare(password, user.password);

          if (! valid) {
            throw new Error('Password does not match');
          }

          return res.json({
            token: JWT(user),
          });
        }
        catch (e) {
          throw new AuthenticationError;
        }
      }),
    ];
  }

  static ping () {
    return [
      Authenticated,
      (req, res) => {
        res.send('Pong!');
      },
    ];
  }
};

export default AuthController;
