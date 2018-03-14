import Controller from 'core/controller';
import Job from 'core/job';
import { expect, spy } from 'support/chai';

describe('Controller @core @controller', () => {
  let controller;

  beforeEach(() => {
    controller = new Controller();
  });

  it('should define a new router for every instance', async () => {
    const other = new Controller();

    controller._router.get('foo', () => {});

    expect(other._router.stack).to.have.lengthOf(0);
    expect(controller._router.stack).to.have.lengthOf(1);
  });

  it('register middleware parameter should be a function or job instance', async () => {
    expect(controller.register.bind(controller, 'get', '/foo', 'kk')).to.throw();
    expect(controller.register.bind(controller, 'get', '/foo', () => {})).to.not.throw();
    expect(controller.register.bind(controller, 'get', '/foo', Job)).to.not.throw();
  });

  it('register should push new item to history', async () => {
    controller.register('get', '/foo', () => {});

    expect(controller._history).to.have.lengthOf(1);
    expect(controller._history).to.have.nested.property('0.method', 'get');
    expect(controller._history).to.have.nested.property('0.route', '/foo');
    expect(controller._history).to.have.nested.property('0.middlewares');
    expect(controller._history[0].middlewares).to.have.lengthOf(1);
  });

  it('sugar methods should call register correctly', async () => {
    spy.on(controller, 'register');

    const callback = () => {};
    const assertions = ['get', 'post', 'put', 'delete', 'all'];

    assertions.forEach((method) => {
      const route = '/' + method;

      controller[method](route, callback);

      expect(controller.register).to.have.been.called.with(method, route, callback);
    });
  });

  it('_last getter should return last item in history', async () => {
    controller.get('foo', () => {});
    controller.post('bar', () => {});

    expect(controller._last).to.have.property('route', 'bar');
    expect(controller._last).to.have.property('method', 'post');
  });

  it('validate method parameter should be an object', async () => {
    spy.on(controller, 'before');

    controller.register('foo', 'foo', () => {});

    expect(controller.validate.bind(controller, 'kk')).to.throw();
    expect(controller.validate.bind(controller, {})).to.not.throw();
  });

  it('before method should add middleware to first item in history', async () => {
    controller.get('foo', () => {});
    controller.post('bar', () => {});

    expect(controller._last.middlewares).to.have.lengthOf(1);

    controller.before('bar');

    expect(controller._last.middlewares).to.have.lengthOf(2);
    expect(controller._last.middlewares[0]).to.be.equals('bar');
  });

  it('after method should add middleware to last item in history', async () => {
    controller.get('foo', () => {});
    controller.post('bar', () => {});

    expect(controller._last.middlewares).to.have.lengthOf(1);

    controller.after('bar');

    expect(controller._last.middlewares).to.have.lengthOf(2);
    expect(controller._last.middlewares[1]).to.be.equals('bar');
  });
});
