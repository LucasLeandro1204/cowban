import Validation from 'core/validation';

class Register extends Validation {
  rules () {
    return [
      this.body('name', 'Name field is required and should contain only letters')
        .exists()
        .matches(/^[A-Za-z\s]+$/g)
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
