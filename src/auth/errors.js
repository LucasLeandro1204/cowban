import SupportError from 'support/error';

class AuthenticationError extends SupportError {
  constructor (message = 'User not found or password does not match') {
    super(message, 401);
	}
}

class EmailAlreadyTaken extends SupportError {
	constructor (message = 'Email already taken') {
		super(message, 401);
	}
}

export {
	EmailAlreadyTaken,
	AuthenticationError,
}
