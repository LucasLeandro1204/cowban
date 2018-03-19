import Knex from 'core/knex';

const rollback = (done = () => {}) => (
  Knex.seed.run() // because seed already drops the data before run xd
);

const wrap = fn => (req, res, next) => fn(req, res, next).catch(next);

const authorizeRequest = token => async request => request.set('Authorization', 'Bearer ' + token);

const instanceOf = (instance, parent) => instance.prototype instanceof parent;

export {
  wrap,
  rollback,
  instanceOf,
  authorizeRequest,
};
