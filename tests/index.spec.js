import { request, expect } from 'support/chai';

describe('Ping test @simple', () => {
  it('it should return Pong!', async () => {
    const res = await request().get('/api/ping');

    expect(res).to.have.status(200);
    expect(res.text).to.equal('Pong!');
  });
});
