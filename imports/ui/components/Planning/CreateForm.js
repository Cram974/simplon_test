import React from 'react';
import PropTypes from 'prop-types';
import ClsNames from 'classnames';
import {Formik, Field, Form} from 'formik';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import {compose} from 'recompose';
import SimpleSchema from 'simpl-schema';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ButtonLoading from '../ButtonLoading';

import TextField from '../TextField';
import Select from '../Select';
import {withComputers} from '../Computers/List';
import {withUsers} from '../Users/List';

import {time, isInBusinessHours, businessHours} from '../../../utils';

function timeValidator() {
  if (!`${this.value}`.match(/\d{2}:\d{2}/g)) {
    return 'timeFormat';
  }
  if (!moment(this.value, 'HH:mm').isValid()) {
    return 'timeInvalid';
  }

  if (!this.field('day').isSet) {
    return;
  }
  const day = this.field('day').value;
  const t = time(day, this.value);
  if (!isInBusinessHours(businessHours)(t)) {
    return 'timeOutOfBusiness';
  }

  if (this.field('end').isSet && this.field('start').isSet) {
    const s = time(day, this.field('start').value);
    const e = time(day, this.field('end').value);

    if (s.isSameOrAfter(e)) {
      return 'timeOutOfBound';
    }
  }
}

const Schema = new SimpleSchema({
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  computerId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  day: {
    type: String,
    custom() {
      if (!`${this.value}`.match(/(\d{2}\/){2}\d{4}/g)) {
        return 'dateFormat';
      }
      if (!moment(this.value, 'DD/MM/YYYY').isValid()) {
        return 'dateInvalid';
      }
    }
  },
  start: {
    type: String,
    custom: timeValidator
  },
  end: {
    type: String,
    custom: timeValidator
  }
});

const validate = values => {
  const errors = {};
  const ctx = Schema.newContext();
  ctx.validate(values);

  if (ctx.isValid()) {
    return null;
  }

  ctx.validationErrors().forEach(({name}) => {
    errors[name] = ctx.keyErrorMessage(name);
  });

  console.log(errors);

  return errors;
};

const submit = ({onCancel}) => (
  {userId, computerId, day, start, end},
  actions
) => {
  const {setStatus, setSubmitting} = actions;

  Meteor.call(
    'assignments.create',
    {
      userId,
      computerId,
      from: time(day, start).toISOString(),
      to: time(day, end).toISOString()
    },
    error => {
      if (error) {
        console.log(error);
        setStatus({type: 'failure', reason: error.details});
      } else {
        setStatus({type: 'success'});
      }

      setSubmitting(false);

      if (!error) {
        setTimeout(() => {
          onCancel();
        }, 1500);
      } else {
        setTimeout(() => {
          setStatus(null);
        }, 3000);
      }
    }
  );
};

const CreateForm = props => {
  const {classes, computers, users, onCancel, ...propsRest} = props;
  return (
    <Formik validate={validate} onSubmit={submit(props)} {...propsRest}>
      {({isSubmitting, status}) => (
        <Form className={ClsNames(classes.form, 'layout-column', 'form')}>
          <Typography type="title">Ajouter une attribution</Typography>
          <div className="layout-row">
            <Field
              name="computerId"
              label="Ordinateur"
              margin="normal"
              className="flex text-field required"
              component={Select}
              options={[
                {name: '', value: null},
                ...(computers || []).map(({_id, name}) => ({
                  value: _id,
                  name
                }))
              ]}
            />
            <Field
              name="userId"
              label="Utilisateur"
              margin="normal"
              className="flex text-field required"
              component={Select}
              options={[
                {name: '', value: null},
                ...(users || []).map(({_id, firstName, lastName}) => ({
                  value: _id,
                  name: `${firstName} ${lastName}`
                }))
              ]}
            />
          </div>
          <Field
            name="day"
            label="Jour"
            margin="normal"
            className="text-field required"
            placeholder="JJ/MM/AAAA"
            component={TextField}
          />
          <div className="layout-row">
            <Field
              name="start"
              label="Début"
              margin="normal"
              className="text-field required"
              placeholder="HH:mm"
              component={TextField}
            />
            <Field
              name="end"
              label="Fin"
              margin="normal"
              className="text-field required"
              placeholder="HH:mm"
              component={TextField}
            />
          </div>
          <Typography align="right">
            <sup>*</sup> champ obligatoire.
          </Typography>
          {(() => {
            if (status && status.type === 'failure') {
              return (
                <Typography color="error" style={{padding: '10px 0'}}>
                  {status.reason}
                </Typography>
              );
            }
          })()}
          <div
            className={ClsNames(
              'layout-row',
              'layout-align-end-center',
              'form-options'
            )}
          >
            <Button onClick={onCancel}>Annuler</Button>
            <ButtonLoading
              type="submit"
              color="primary"
              state={isSubmitting ? 'loading' : (status || {}).type}
            >
              Créer
            </ButtonLoading>
          </div>
        </Form>
      )}
    </Formik>
  );
};

CreateForm.propTypes = {
  onCancel: PropTypes.func,
  classes: PropTypes.object.isRequired
};

CreateForm.defaultProps = {
  onCancel: null
};

export default compose(withComputers, withUsers)(CreateForm);
