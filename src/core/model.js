import Knex from 'core/knex';
import { Model } from 'objection';

Model.knex(Knex);

export default class extends Model {
  $beforeInsert () {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate () {
    this.updated_at = new Date();
  }
};
