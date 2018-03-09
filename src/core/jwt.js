import Config from 'config';
import User from 'model/user';
import JWT from 'jsonwebtoken';

export default (user, lifetime) => {

  // useless?
  if (! (user instanceof User)) {
    throw new Error('Only users can be authenticated!');
  }

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
