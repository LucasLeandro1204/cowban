import JWT from 'express-jwt';
import Config from 'config';
import CoreJWT from 'core/jwt';

export default [
	JWT({
  	secret: Config.get('jwt.secret'),
  	getToken (req) {
   		const splited = req.headers.authorization ? req.headers.authorization.split(' ') : [];

    	return splited[0] === 'Bearer' ? splited[1] : null;
  	},
	}),
	(req, res, next) => {
		const token = CoreJWT(req.user);

		res.set('token', token);

    next();
  },
];
