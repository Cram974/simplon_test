import SimpleSchema from 'simpl-schema';
import {check} from 'meteor/check';

const Computer = new SimpleSchema(
  {
    name: {
      label: 'Nom',
      type: String,
      min: 2
    },
    description: {
      label: 'Description',
      type: String,
      optional: true
    }
  },
  {check}
);

export default Computer;
