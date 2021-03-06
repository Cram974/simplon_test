import React from 'react';
import PropTypes from 'prop-types';
import {compose, withState, withHandlers} from 'recompose';

import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip';

import CreateModal from './CreateModal';
import List from './List';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

const Users = props => {
  const {classes, open, openModal, closeModal} = props;
  return (
    <div className="page layout-fill layout-column">
      <CreateModal open={open} onClose={closeModal} />
      <AppBar
        className="list-head"
        position="static"
        color="inherit"
        elevation={4}
      >
        <Toolbar>
          <Typography type="subheading" color="inherit">
            Ordinateurs
          </Typography>
        </Toolbar>
      </AppBar>
      <List className="flex" />
      <Tooltip title="Ajouter un ordinateur" placement="left">
        <Button fab className={classes.fab} color="primary" onClick={openModal}>
          <AddIcon />
        </Button>
      </Tooltip>
    </div>
  );
};

Users.propTypes = {
  open: PropTypes.bool,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  classes: PropTypes.object.isRequired
};

Users.defaultProps = {
  open: false,
  openModal: null,
  closeModal: null
};

export default compose(
  withStyles(styles),
  withState('open', 'setOpen', false),
  withHandlers({
    openModal: ({setOpen}) => () => setOpen(true),
    closeModal: ({setOpen}) => () => setOpen(false)
  })
)(Users);
