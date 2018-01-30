import SimpleSchema from 'simpl-schema';
import {check} from 'meteor/check';

const User = new SimpleSchema(
  {
    firstName: {
      label: 'Prénom',
      type: String,
      min: 2
    },
    lastName: {
      label: 'Nom',
      type: String,
      min: 2
    },
    email: {
      label: 'Email',
      type: String,
      regEx: SimpleSchema.RegEx.EmailWithTLD
    }
  },
  {check}
);

export default User;
