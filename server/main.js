import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import Users from '../imports/api/users';

SimpleSchema.defineValidationErrorTransform(error => {
  const ddpError = new Meteor.Error(error.message);
  ddpError.error = 'validation-error';
  ddpError.details = error.details;
  return ddpError;
});

Meteor.startup(() => {
  // code to run on server at startup
  Users._ensureIndex({email: 1}, {unique: true});

  if (Users.find({}).count() === 0) {
    // Seed database
    import('../imports/seed').then(s => s.default());
  }
});
