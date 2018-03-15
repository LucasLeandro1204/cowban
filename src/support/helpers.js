import Knex from 'core/knex';

const rollback = (done = () => {}) => (
  Knex.seed.run() // because seed already drops the data before run xd
);

const wrap = fn => (req, res, next) => fn(req, res, next).catch(next);

export {
  wrap,
  rollback,
};
