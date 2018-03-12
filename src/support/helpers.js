import Knex from 'core/knex';
import { set } from 'lodash';
import { matchedData } from 'express-validator/filter';
import { checkSchema, validationResult } from 'express-validator/check';

const rollback = (done = () => {}) => (
  Knex.seed.run() // because seed already drops the data before run xd
);

const wrap = fn => (req, res, next) => fn(req, res, next).catch(next);

const schema = obj => ({
  status: status => [
    checkSchema(obj),
    (req, res, next) => {
      const errors = validationResult(req);

      if (! errors.isEmpty()) {
        return res.status(status).json({
          errors: errors.mapped(),
        });
      }

      set(req, 'validated', matchedData(req));

      next();
    }
  ],
});

export {
  wrap,
  schema,
  rollback,
};
