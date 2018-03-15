import { set } from 'lodash';
import { matchedData } from 'express-validator/filter';
import { body, validationResult } from 'express-validator/check';

class Validation {
  constructor (status = 422) {
    this.status = status;
  }

  rules () {
    throw new Error('Rules must be overwrited');
  }

  get body () {
    return body;
  }

  setup () {
    return [ this.rules(), this.after() ];
  }

  after () {
    return (req, res, next) => {
      const errors = validationResult(req);

      if (! errors.isEmpty()) {
        return res.status(this.status).json({
          errors: errors.mapped(),
        });
      }

      set(req, 'validated', matchedData(req));

      next();
    }
  }
};

export default Validation;
