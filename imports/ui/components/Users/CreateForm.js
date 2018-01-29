import React from 'react';
import PropTypes from 'prop-types';
import ClsNames from 'classnames';
import {Formik, Field, Form} from 'formik';
import {Meteor} from 'meteor/meteor';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ButtonLoading from '../ButtonLoading';

import TextField from '../TextField';
import UserSchema from '../../../schemas/User';

const validate = values => {
  const errors = {};
  const ctx = UserSchema.newContext();
  ctx.validate(values);

  if (ctx.isValid()) {
    return null;
  }

  ctx.validationErrors().forEach(({name}) => {
    errors[name] = ctx.keyErrorMessage(name);
  });

  return errors;
};

const submit = ({onCancel}) => (user, actions) => {
  const {setStatus, setSubmitting} = actions;

  Meteor.call('users.create', user, error => {
    if (error) {
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
  });
};

const CreateForm = props => {
  const {classes, onCancel, ...propsRest} = props;
  return (
    <Formik validate={validate} onSubmit={submit(props)} {...propsRest}>
      {({isSubmitting, status}) => (
        <Form className={ClsNames(classes.form, 'layout-column', 'form')}>
          <Typography type="title">Créer un utilisateur</Typography>
          <div className="layout-row layout-align-space-between">
            <Field
              name="lastName"
              label="Nom"
              margin="normal"
              className="flex text-field required"
              component={TextField}
            />
            <Field
              name="firstName"
              label="Prénom"
              margin="normal"
              className="flex text-field required"
              component={TextField}
            />
          </div>
          <Field
            name="email"
            label="Email"
            margin="normal"
            className="text-field required"
            placeholder="example@mail.com"
            component={TextField}
          />
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

export default CreateForm;
