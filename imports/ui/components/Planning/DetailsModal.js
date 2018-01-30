import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import moment from 'moment';

import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Modal from 'material-ui/Modal';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import {withTracker} from 'meteor/react-meteor-data';

import Assignments from '../../../api/assignments';

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

const DetailsModal = props => {
  const {classes, id, assignment, onDelete, ...propsRest} = props;
  const {user, computer, from, to} = assignment || {};

  return (
    <Modal className={classes.container} {...propsRest}>
      <Paper elevation={4} style={{minWidth: '15%', padding: '2em'}}>
        {assignment && (
          <Typography>
            Utilisateur: {user.email} <br />
            Ordinateur: {computer.name} <br />
            le {moment(from).format('DD/MM/YYYY')} de{' '}
            {moment(from).format('HH:mm')} à {moment(to).format('HH:mm')}
          </Typography>
        )}
        <Button color="secondary" className="full-width" onClick={onDelete}>
          Supprimer
        </Button>
      </Paper>
    </Modal>
  );
};

DetailsModal.propTypes = {
  ...Modal.propTypes,
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withTracker(props => {
    const {id} = props;
    return {
      assignment: Assignments.find({_id: id}).fetch()[0]
    };
  })
)(DetailsModal);
