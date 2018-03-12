import SupportError from 'support/error';

export class AuthenticationError extends SupportError {
  constructor (message = 'User not found or password does not match') {
    super(message, 401);
  }
};
