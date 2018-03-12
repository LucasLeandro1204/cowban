import JWT from 'core/jwt';
import Controller from 'auth/controller';

Controller
  .get('/ping', 'ping')
  .post('/login', 'login');

export default Controller.setup();
