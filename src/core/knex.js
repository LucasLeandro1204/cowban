import Knex from 'knex';
import Config from 'config';

export default Knex(Config.get(`database.${Config.get('database.driver')}`));
