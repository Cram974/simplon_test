import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

import UserSchema from '../schemas/User';

const Users = new Mongo.Collection('users');

export const create = ({firstName, lastName, email}) => {
  UserSchema.validate({firstName, lastName, email});

  try {
    Users.insert({
      firstName,
      lastName,
      email: email.toLowerCase()
    });
  } catch (error) {
    switch (error.code) {
      case 11000:
        throw new Meteor.Error(
          'duplicate',
          'Email déjà existant',
          "L'adresse de l'utilisateur que vous souhaitez créer existe déjà"
        );
      default:
        console.error(error); // eslint-disable-line no-console
        throw new Meteor.Error(
          'unknown',
          'Erreur inattendue',
          "Une erreur inattendue s'est produite lors de la création de l'utilisateur en base. Voir les logs pour plus d'informations"
        );
    }
  }
};

export const drop = () => {
  Users.remove({});
};

Meteor.methods({
  'users.create': create,
  'users.drop': drop
});

export default Users;
