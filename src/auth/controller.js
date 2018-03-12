import JWT from 'core/jwt';
import Hash from 'core/hash';
import User from 'model/user';
import { wrap } from 'support/helpers';
import Controller from 'core/controller';

class AuthController extends Controller {
  login () {
    return wrap(async ({ validated: { email, password } }, res) => {
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
    });
  }

  ping () {
    return (req, res) => res.send('Pong!');
  }
};

export default new AuthController();
