import { wrap } from 'support/helpers';
import { AssertionError } from 'assert';

class Job {
  get _async () {
    return false;
  }

  handle () {
    throw new Error('Handle must be overwrited.');
  }

  prepare () {
    if (this._async) {
      return wrap(this.handle);
    }

    return this.handle;
  }
};

const Async = father => class extends father {
  get _async () {
    return true;
  }
};

export default Job;

export {
  Async
};
