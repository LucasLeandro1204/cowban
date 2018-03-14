import Config from 'config';
import Hash from 'core/hash';
import { expect } from 'support/chai';

describe('Hash @core @hash', () => {
  it('rounds should be the same as in config', async () => {
    expect(Hash._rounds).to.be.equals(Config.get('hash.rounds'));
  });

  it('should encrypt the content', async () => {
    const string = 'Foo';
    const encrypted = await Hash.encrypt(string);

    expect(encrypted).to.not.be.equals(string);
  });

  it('should return false if content does not match', async () => {
    const string = 'Foo';
    const encrypted = await Hash.encrypt('Random');
    const compare = await Hash.compare(string, encrypted);

    expect(compare).to.be.false;
  });

  it('should return true if content does match', async () => {
    const string = 'Foo';
    const encrypted = await Hash.encrypt(string);
    const compare = await Hash.compare(string, encrypted);

    expect(compare).to.be.true;
  });
});
