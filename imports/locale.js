import SimpleSchema from 'simpl-schema';

import find from 'lodash.find';

const regExpMessages = [
  {
    exp: SimpleSchema.RegEx.Email,
    msg: 'Veuillez fournir une adresse électronique valide.'
  },
  {
    exp: SimpleSchema.RegEx.EmailWithTLD,
    msg: 'Veuillez fournir une adresse électronique valide.'
  },
  {exp: SimpleSchema.RegEx.Domain, msg: 'must be a valid domain'},
  {exp: SimpleSchema.RegEx.WeakDomain, msg: 'must be a valid domain'},
  {exp: SimpleSchema.RegEx.IP, msg: 'must be a valid IPv4 or IPv6 address'},
  {exp: SimpleSchema.RegEx.IPv4, msg: 'must be a valid IPv4 address'},
  {exp: SimpleSchema.RegEx.IPv6, msg: 'must be a valid IPv6 address'},
  {exp: SimpleSchema.RegEx.Url, msg: 'must be a valid URL'},
  {exp: SimpleSchema.RegEx.Id, msg: 'must be a valid alphanumeric ID'},
  {exp: SimpleSchema.RegEx.ZipCode, msg: 'must be a valid ZIP code'},
  {exp: SimpleSchema.RegEx.Phone, msg: 'must be a valid phone number'}
];

const defaultMessages = {
  initialLanguage: 'fr',
  messages: {
    fr: {
      required: 'Ce champ est obligatoire.',
      minString: 'Veuillez fournir au moins {{min}} caractères.',
      maxString: 'Veuillez fournir au plus {{max}} caractères.',
      minNumber: '{{{label}}} must be at least {{min}}',
      maxNumber: '{{{label}}} cannot exceed {{max}}',
      minNumberExclusive: '{{{label}}} must be greater than {{min}}',
      maxNumberExclusive: '{{{label}}} must be less than {{max}}',
      minDate: '{{{label}}} must be on or after {{min}}',
      maxDate: '{{{label}}} cannot be after {{max}}',
      badDate: '{{{label}}} is not a valid date',
      minCount: 'You must specify at least {{minCount}} values',
      maxCount: 'You cannot specify more than {{maxCount}} values',
      noDecimal: '{{{label}}} must be an integer',
      notAllowed: '{{{value}}} is not an allowed value',
      expectedType: '{{{label}}} must be of type {{dataType}}',
      regEx({regExp}) {
        // See if there's one where exp matches this expression
        let msgObj;
        if (regExp) {
          msgObj = find(
            regExpMessages,
            o => o.exp && o.exp.toString() === regExp
          );
        }

        const regExpMessage = msgObj
          ? msgObj.msg
          : 'failed regular expression validation';

        return regExpMessage;
      },
      keyNotInSchema: '{{name}} is not allowed by the schema'
    }
  }
};

SimpleSchema.setDefaultMessages(defaultMessages);

export default defaultMessages;
