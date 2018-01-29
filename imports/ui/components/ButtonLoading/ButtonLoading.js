import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';
import {CircularProgress} from 'material-ui/Progress';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import Button from 'material-ui/Button';
import CheckIcon from 'material-ui-icons/Check';
import ClearIcon from 'material-ui-icons/Clear';

const styles = theme => ({
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative'
  },
  success: {
    color: 'white',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  },
  failure: {
    color: 'white',
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700]
    }
  },
  progress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
});

const ButtonLoading = props => {
  const {classes, state, children, ...propsRest} = props;

  const loading = state === 'loading';
  const success = state === 'success';
  const failure = state === 'failure';

  return (
    <div className={classes.wrapper}>
      <Button
        {...propsRest}
        className={classNames({
          [classes.success]: success,
          [classes.failure]: failure
        })}
        disabled={loading}
      >
        {(() => {
          if (success) {
            return <CheckIcon />;
          } else if (failure) {
            return <ClearIcon />;
          }
          return children;
        })()}
      </Button>
      {loading && <CircularProgress size={24} className={classes.progress} />}
    </div>
  );
};

ButtonLoading.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonLoading);
