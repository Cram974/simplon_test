import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

import ComputerSchema from '../schemas/Computer';

const Computers = new Mongo.Collection('computers');

export const create = ({name, description}) => {
  ComputerSchema.validate({name, description});

  try {
    Computers.insert({
      name,
      description
    });
  } catch (error) {
    switch (error.code) {
      default:
        console.error(error); // eslint-disable-line no-console
        throw new Meteor.Error(
          'unknown',
          'Erreur inattendue',
          "Une erreur inattendue s'est produite lors de la création de l'ordinateur en base. Voir les logs pour plus d'informations"
        );
    }
  }
};

export const drop = () => {
  Computers.remove({});
};

Meteor.methods({
  'computers.create': create,
  'computers.drop': drop
});

export default Computers;
