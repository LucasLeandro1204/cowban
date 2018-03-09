import Chai from 'chai';
import Server from '@/src';
import ChaiHttp from 'chai-http';

Chai.use(ChaiHttp);

const request = Chai.request.bind(Chai, Server);
const expect = Chai.expect;

export {
  Chai,
  expect,
  request,
};
