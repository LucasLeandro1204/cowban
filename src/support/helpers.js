import Knex from 'core/knex';

const rollback = (done = () => {}) => (
  Knex.migrate.rollback()
    .then(() => Knex.migrate.latest())
    .then(() => Knex.seed.run())
    .then(() => done())
);

const wrap = fn => (req, res, next) => fn(req, res, next).catch(next);

export {
  wrap,
  rollback,
};
