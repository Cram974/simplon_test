import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check, Match} from 'meteor/check';

const Users = new Mongo.Collection('users');

const isEmail = str => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(str);
};

Meteor.methods({
  'users.create'({firstName, lastName, email}) {
    check(firstName, String);
    check(lastName, String);
    check(email, String);
    check(email, Match.Where(isEmail));

    Users.insert({
      firstName,
      lastName,
      email: email.toLowerCase()
    });
  }
});

export default Users;
