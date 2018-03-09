import Model from 'core/model';

class User extends Model {
  static get tableName () {
    return 'users';
  }

  static get jsonSchema () {
    return {
      required: ['name', 'email', 'password'],
    };
  }

  static get relationMappings () {
    return {
      ...AccountRelation.relationMap(User),
    };
  }
}

export default User;
