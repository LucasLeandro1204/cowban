import Job from 'core/job';
import JWT from 'core/jwt';
import Hash from 'core/hash';
import User from 'model/user';

class Login extends Job {
  constructor (email, password) {
    super(true);
    this.email = email;
    this.password = password;
  }

  async handle () {
    const user = await User.query().findOne({
      email: this.email,
    }).throwIfNotFound();

    const valid = await Hash.compare(this.password, user.password);

    if (! valid) {
      throw new Error('Password does not match');
    }

    return JWT(User);
  }

  response (res, token) {
    return res.json({
      token,
    });
  }

  static instanceFromReq ({ validated: { email, password } }, res) {
    return new Login(email, password);
  }
};

export default Login;
