import Validation from 'core/validation';

class Login extends Validation {
  rules () {
    return [
      this.body('email', 'Email field is required and should be valid')
        .exists()
        .isEmail(),
      this.body('password', 'Password field is required')
        .exists(),
    ];
  }
};

export default Login;
