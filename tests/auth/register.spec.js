import Hash from 'core/hash';
import User from 'model/user';
import { rollback } from 'support/helpers';
import { request, expect, fail } from 'support/chai';

describe('Register @register @integration', () => {
  beforeEach(rollback);

  after(rollback);

  it('should fail if name, password or email not provided', async () => {
    try {
      await fail(request()
        .post('/api/auth/register')
        .send());
    } catch ({ response: res }) {
      expect(res).to.have.status(422);
      expect(res.body).to.have.nested.property('errors.name.msg', 'Name field is required and should contain only letters');
      expect(res.body).to.have.nested.property('errors.email.msg', 'Email field is required and should be valid');
      expect(res.body).to.have.nested.property('errors.password.msg', 'Password field is required');
    }
  });

  it('should fail if name contain something else than letters', async () => {
    try {
      await fail(request()
        .post('/api/auth/register')
        .send({
          name: 'Lucas @L.',
          email: 'lucas@lucas.com',
          password: 'not long enought to be secure',
        }));
    } catch ({ response: res }) {
      expect(res).to.have.status(422);
      expect(res.body).to.have.nested.property('errors.name.msg', 'Name field is required and should contain only letters');
    }
  });

  it('should fail if email is invalid', async () => {
    try {
      await fail(request()
        .post('/api/auth/register')
        .send({
          name: 'Lucas Leandro',
          email: 'lucaslucas.com',
          password: 'not long enought to be secure',
        }));
    } catch ({ response: res }) {
      expect(res).to.have.status(422);
      expect(res.body).to.have.nested.property('errors.email.msg', 'Email field is required and should be valid');
    }
  });

  it('should fail if email already taken', async () => {
    const user = await User.query().first();

    try {
      await fail(request()
        .post('/api/auth/register')
        .send({
          email: user.email,
          name: 'Lucas Leandro',
          password: 'not long enought to be secure',
        }));
    } catch ({ response: res }) {
      expect(res).to.have.status(401);
      expect(res.body.message).to.be.equals('Email already taken');
    }
  });

  it('should create a new user if everything is ok', async () => {
    const res = await request()
      .post('/api/auth/register')
      .send({
        name: 'My foo name',
        email: 'foo@register.com',
        password: 'a long password must be secure',
      });

    expect(res).to.have.status(201);

    const user = await User.query().findOne({
      email: 'foo@register.com',
    });

    expect(user).to.be.not.null;
    expect(user.name).to.be.equals('My foo name');

    // password must be encrypted before save.
    expect(await Hash.compare('a long password must be secure', user.password)).to.be.true;
  });
});
