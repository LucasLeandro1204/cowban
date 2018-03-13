import JWT from 'core/jwt';
import Hash from 'core/hash';
import User from 'model/user';
import { wrap } from 'support/helpers';
import { schema } from 'support/helpers';
import Controller from 'core/controller';
import Authenticated from 'auth/middleware';
import { AuthenticationError } from 'auth/errors';

const controller = new Controller();

controller
  .get('/ping', (req, res) => res.send('Pong!'))
    .before(Authenticated)
  .post('/login', wrap(async ({ validated: { email, password } }, res) => {
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
  }))
    .before(schema({
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

export default controller.setup();
