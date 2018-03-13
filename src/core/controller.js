import { Router } from 'express';

class Controller {
  constructor () {
    this._history = [];
    this._router = Router();
  }

  register (method, route, middleware) {
    if (typeof middleware != 'function') {
      throw new Error('Middleware must be a function.');
    }

    this._history.push({
      route,
      method,
      middlewares: [ middleware ],
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
