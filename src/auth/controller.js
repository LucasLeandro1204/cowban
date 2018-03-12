import { wrap } from 'support/helpers';
import Authenticated from 'auth/middleware';
import{ checkSchema } from 'express-validator/check';

class AuthController {
  static login () {
    return [
      checkSchema({

      }),
      wrap(async (req, res) => {

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
