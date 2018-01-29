import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';

import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Modal from 'material-ui/Modal';

import CreateForm from './CreateForm';

const layoutColumn = {
  display: 'flex',
  flexDirection: 'column'
};

const styles = theme => ({
  container: {
    ...layoutColumn,
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    ...layoutColumn,
    background: 'white',
    padding: theme.spacing.unit * 2
  }
});

const CreateModal = props => {
  const {classes, ...propsRest} = props;
  const {onClose} = props;

  return (
    <Modal className={classes.container} {...propsRest}>
      <Paper elevation={4}>
        <CreateForm classes={classes} onCancel={onClose} />
      </Paper>
    </Modal>
  );
};

CreateModal.propTypes = {
  ...Modal.propTypes,
  classes: PropTypes.object.isRequired
};

export default compose(withStyles(styles))(CreateModal);
