import Validation from 'core/validation';
import isAlpha from 'validator/lib/isAlpha';

class Register extends Validation {
  rules () {
    return [
      this.body('name', 'Name field is required and should contain only letters')
        .exists()
        .custom(str => str.split(' ').filter(s => ! isAlpha(s)).length == 0)
        .trim(),
      this.body('email', 'Email field is required and should be valid')
        .exists()
        .isEmail(),
      this.body('password', 'Password field is required')
        .exists(),
    ];
  }
};

export default Register;
