import SimpleSchema from 'simpl-schema';
import {check} from 'meteor/check';
import moment from 'moment';

import {businessHours, isInBusinessHours} from '../utils';

const AssignmentBase = new SimpleSchema(
  {
    userId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    },
    computerId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    }
  },
  {check}
);

export const dateTimeValidator = function() {
  const t = moment(this.value);
  if (!t.isValid()) {
    return 'timeInvalid';
  }

  if (!isInBusinessHours(businessHours)(t)) {
    return 'timeOutOfBusiness';
  }

  // if (moment().isAfter(t)) {
  //   return 'timeTooOld';
  // }
};

export const CreateAssignment = new SimpleSchema({
  from: {
    type: String,
    custom: dateTimeValidator
  },
  to: {
    type: String,
    custom: dateTimeValidator
  }
});

CreateAssignment.extend(AssignmentBase);

export default AssignmentBase;
