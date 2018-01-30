import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import moment from 'moment';
import {CreateAssignment as CreateSchema} from '../schemas/Assignment';

import Computers from './computers';
import Users from './users';

const Assignments = new Mongo.Collection('assignments');

Assignments.join(Computers, 'computerId', 'computer', ['name']);
Assignments.join(Users, 'userId', 'user', ['email', 'firstName', 'lastName']);

export const create = ({computerId, userId, from, to}) => {
  CreateSchema.validate({computerId, userId, from, to});

  const start = moment(from).toDate();
  const end = moment(to).toDate();

  const overlap = {
    from: {$lt: end},
    to: {$gt: start}
  };

  const overlapDoc = Assignments.findOne({
    $or: [
      {
        // Chevauchement de ressource
        // (2 utilisateur => 1 ordinateur)
        computerId,
        ...overlap
      },
      {
        // Chevauchement d'utilisateur
        // (1 utilisateur => 2 ordinateurs)
        userId,
        ...overlap
      }
    ]
  });
  if (overlapDoc) {
    console.log(JSON.stringify(overlapDoc, null, 2));
    throw new Meteor.Error(
      'time-overlap',
      'Horaire conflictuel',
      "L'horaire est en conflit avec une autre attribution"
    );
  }
  try {
    Assignments.insert({
      computerId,
      userId,
      from: start,
      to: end
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
  Assignments.remove({});
};

export const remove = id => {
  Assignments.remove({_id: id});
};

Meteor.methods({
  'assignments.create': create,
  'assignments.drop': drop,
  'assignments.remove': remove
});

export default Assignments;
