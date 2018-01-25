import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

const Users = props => {
  const {classes} = props;
  return [
    <Typography noWrap>Hello world</Typography>,
    <Button fab className={classes.fab} color="primary">
      <AddIcon />
    </Button>
  ];
};

Users.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Users);
