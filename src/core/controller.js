import Job from 'core/job';
import { Router } from 'express';
import { schema } from 'support/helpers';

class Controller {
  constructor () {
    this._history = [];
    this._router = Router();
  }

  register (method, route, middleware) {
    const instance = middleware.prototype instanceof Job;

    if (typeof middleware != 'function' && ! instance) {
      throw new Error('Middleware must be a function or job instance.');
    }

    this._history.push({
      route,
      method,
      middlewares: [ instance ? (req, res, next) => middleware.from(req, res, next) : middleware ],
    });

    return this;
  }

  before (middleware) {
    this._last.middlewares.unshift(middleware);

    return this;
  }

  after (middleware) {
    this._last.middlewares.push(middleware);

    return this;
  }

  get _last () {
    const length = this._history.length - 1;

    return this._history[length];
  }

  validate (object) {
    if (typeof object != 'object') {
      throw new Error('Validate parameter must to be an object');
    }

    return this.before(schema(object));
  }

  get (route, middleware) {
    return this.register('get', route, middleware);
  }

  post (route, middleware) {
    return this.register('post', route, middleware);
  }

  put (route, middleware) {
    return this.register('put', route, middleware);
  }

  delete (route, middleware) {
    return this.register('delete', route, middleware);
  }

  all (route, middleware) {
    return this.register('all', route, middleware);
  }

  setup () {
    this._history.forEach(({ method, route, middlewares }) => {
      this._router[method](route, ...middlewares);
    });

    return this._router;
  }
};

export default Controller;
