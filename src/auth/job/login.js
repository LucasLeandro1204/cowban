import JWT from 'core/jwt';
import Hash from 'core/hash';
import User from 'model/user';
import Job, { Async } from 'core/job';

class Login extends Async(Job) {
  async handle ({ validated: { email, password } }, res) {
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
};

export default new Login();
