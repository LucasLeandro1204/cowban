class Job {
  constructor (asyncJob = false) {
    this._async = asyncJob;
  }

  static instanceFromReq () {
    throw new Error('InstanceFromReq must be overwrited.');
  }

  handle () {
    throw new Error('Handle must be overwrited.');
  }

  static async from (req, res, next) {
    const instance = this.instanceFromReq(req, res, next);

    let response;

    try {
      if (instance._async) {
        response = await instance.handle();
      } else {
        response = instance.handle();
      }
    } catch (e) {
      return next(e);
    }

    return instance.response(res, response);
  }
};

export default Job;
