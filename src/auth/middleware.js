import Config from 'config';
import JWT from 'express-jwt';
import jwt from 'core/jwt';

export default [
	JWT({
  	secret: Config.get('jwt.secret'),
  	getToken (req) {
   		const splited = req.headers.authorization ? req.headers.authorization.split(' ') : [];

    	return splited[0] === 'Bearer' ? splited[1] : null;
  	},
	}),
	(req, res) => {
		const token = jwt(req.user);

    res.send({ token });
  },
];
