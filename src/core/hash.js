import Bcrypt from 'bcrypt';
import Config from 'config';

class Hash {
  constructor (rounds) {
    this._rounds = rounds;
  }

  async encrypt (text) {
    return await Bcrypt.hash(text, this._rounds);
  }

  async compare (text, hash) {
    return await Bcrypt.compare(text, hash);
  }
};

export default new Hash(Config.get('hash.rounds'));
