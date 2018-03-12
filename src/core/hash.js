import Bcrypt from 'bcrypt';
import Config from 'config';

class Hash {
  constructor (rounds) {
    this.rounds = rounds;
  }

  async encrypt (text) {
    return await Bcrypt.hash(text, this.rounds);
  }

  async compare (text, hash) {
    return await Bcrypt.compare(text, hash);
  }
};

export default new Hash(Config.get('hash.rounds'));
