import Config from 'config';
import JWT from 'express-jwt';

export default JWT({
  secret: Config.get('jwt.secret'),
  requestProperty: 'auth',
  getToken (req) {
    const splited = req.headers.authorization ? req.headers.authorization.split(' ') : [];

    return splited[0] === 'Bearer' ? splited[1] : null;
  },
});
