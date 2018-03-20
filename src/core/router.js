import Job from 'core/job';
import { set } from 'lodash';
import Express from 'express';
import Validation from 'core/validation';
import { instanceOf } from 'support/helpers';
// import Authorization from 'core/authorization';

class Router {
  constructor () {
    this._childs = [];
    this._routes = [];
    this._prefix = '/';
    this._middlewares = [];
    this._authorization = null;
  }

  register (method, route, middleware) {
    const instance = instanceOf(middleware, Job);

    if (typeof middleware != 'function' && ! instance) {
      throw new Error('Middleware must be a function or Job instance.');
    }

    if (['get', 'post', 'put', 'delete', 'all'].indexOf(method) === -1) {
      throw new Error('Method ' + method + ' not found.');
    }

    this._routes.push({
      method,
      route,
      before: [],
      validate: null,
      authorize: null,
      middleware: instance ? (...args) => middleware.from(...args) : middleware,
      handle: null,
    });

    return this;
  }

  middleware (middlewares) {
    this._middlewares.push(middlewares);

    return this;
  }

  before (middlewares) {
    this._last.before.push(middlewares);

    return this;
  }

  authorization (authorization) {
    if (! instanceOf(authorization, Authorization)) {
      throw new Error('Authorization parameter must be an Authorization instance.');
    }

    this._authorization = authorization;

    return this;
  }

  authorize (method, authorize) {
    if (! this._authorization) {
      throw new Error('Must set authorization before call authorize.');
    }

    this._last.authorize = this._authorization.get(method, authorize);

    return this;
  }

  validate (validation) {
    if (! instanceOf(validation, Validation)) {
      throw new Error('Validation parameter must be an Validation instance.');
    }

    this._last.validate = validation.build();

    return this;
  }

  handle (handler) {
    if (typeof handler != 'function') {
      throw new Error('Handler must be a Function');
    }

    this._last.handler = (err, req, res, next) => handler(arguments);

    return this;
  }

  get _last () {
    const length = this._routes.length;

    if (length === 0) {
      throw new Error('You have to insert a new route before call _last.');
    }

    return this._routes[length - 1];
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

  use (router) {
    this._childs.push(router);

    return this;
  }

  prefix (prefix) {
    if (typeof prefix != 'string') {
      throw new Error('Prefix must be a String');
    }

    this._prefix = prefix;

    return this;
  }

  build () {
    const router = Express.Router();
    const prefix = Express.Router();

    prefix.use(this._prefix, router);

    if (this._middlewares.length !== 0) {
      router.use(this._middlewares);
    }

    this._routes.forEach((route) => {
      const method = route.method;

      Reflect.deleteProperty(route, 'method');

      router[method](
        ...Object.values(route)
          .filter(prop => prop !== null)
      );
    });

    this._childs.forEach(child => router.use(child));

    return prefix;
  }
};

export default Router;
