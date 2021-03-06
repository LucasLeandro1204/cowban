import JWT from 'core/jwt';
import Hash from 'core/hash';
import User from 'model/user';
import { rollback } from 'support/helpers';
import { request, expect, fail } from 'support/chai';

describe('Auth @auth @integration', () => {
  beforeEach(rollback);

  after(rollback);

  it('should deny access', async () => {
    try {
      await fail(request().get('/api/auth/ping'));
    } catch (err) {
      expect(err).to.have.status(401);
    }
  });

  it('should fail if email or password not provided', async () => {
    try {
      await fail(request()
        .post('/api/auth/login')
        .send());
    } catch ({ response: res }) {
      expect(res).to.have.status(422);
      expect(res.body).to.have.nested.property('errors.email.msg', 'Email field is required and should be valid');
      expect(res.body).to.have.nested.property('errors.password.msg', 'Password field is required');
    }
  });

  it('should fail if email is not valid', async () => {
    try {
      await fail(request()
        .post('/api/auth/login')
        .send({
          email: 'lucas.com',
          password: 'some random password',
        }));
    } catch ({ response: res }) {
      expect(res).to.have.status(422);
      expect(res.body).to.have.nested.property('errors.email.msg', 'Email field is required and should be valid');
    }
  });

  it('should fail if user not found or password does not match', async () => {
    const { email } = await User.query().first();

    try {
      await fail(request()
        .post('/api/auth/login')
        .send({
          email: 'foo@foo.com',
          password: 'foo123',
        }));
    } catch ({ response: res }) {
      expect(res).to.have.status(401);
      expect(res.body.message).to.be.equals('User not found or password does not match');
    }

    try {
      await fail(request()
        .post('/api/auth/login')
        .send({
          email,
          password: 'foo123',
        }));
    } catch ({ response: res }) {
      expect(res).to.have.status(401);
      expect(res.body.message).to.be.equals('User not found or password does not match');
    }
  });

  it('should pass if found user and password match', async () => {
    const user = await User.query().insert({
      name: 'Foo bar',
      email: 'foo@bar.com',
      password: await Hash.encrypt('foo123'),
    });

    const res = await request()
      .post('/api/auth/login')
      .send({
        email: 'foo@bar.com',
        password: 'foo123',
      });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
  });

  it('should deny access if an invalid token is provided', async () => {
    try {
      await fail(request()
        .get('/api/auth/ping')
        .set('Authorization', 'Bearer foobarbaz'));
    } catch (err) {
      expect(err).to.have.status(401);
    }
  });

  it('should allow access if a valid token is provided', async () => {
    const user = await User.query().first();
    const token = JWT(user);

    const res = await request()
      .get('/api/auth/ping')
      .set('Authorization', 'Bearer ' + token);

    expect(res).to.have.status(200);
    expect(res).to.have.header('token');
  });
});
