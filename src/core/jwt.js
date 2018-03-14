import Config from 'config';
import JWT from 'jsonwebtoken';
import User from 'model/user';

export default (user, lifetime) => {
  return JWT.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    Config.get('jwt.secret'),
    {
      expiresIn: lifetime || Config.get('jwt.expires'),
    },
  );
};
