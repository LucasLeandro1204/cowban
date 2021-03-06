import Chai from 'chai';
import Server from '@/src';
import Spies from 'chai-spies';
import ChaiHttp from 'chai-http';

Chai.use(Spies);
Chai.use(ChaiHttp);

const spy = Chai.spy;
const expect = Chai.expect;
const request = Chai.request.bind(Chai, Server);
const fail = async req => {
  await req;

  throw new Error('Request must fail.');
};

export {
  spy,
  Chai,
  fail,
  expect,
  request,
};
