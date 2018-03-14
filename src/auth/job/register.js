import Job from 'core/job';
import Hash from 'core/hash';
import User from 'model/user';

class Register extends Job {
  constructor (name, email, password) {
    super(true);
    this.name = name
    this.email = email;
    this.password = password;
  }

  async handle () {
    const user = await User.query().findOne({
      email: this.email,
    });

    if (user) {
      throw new Error('Email already taken');
    }

    await User.query().insert({
      name: this.name,
      email: this.email,
      password: await Hash.encrypt(this.password),
    });
  }

  response (res) {
    return res.sendStatus(201);
  }

  static instanceFromReq ({ validated: { name, email, password } }, res) {
    return new Register(name, email, password);
  }
};

export default Register;
