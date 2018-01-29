import React from 'react';
import PropTypes from 'prop-types';
import ClsNames from 'classnames';
import MUIList, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';

import {withTracker} from 'meteor/react-meteor-data';

import Users from '../../../api/users';

const applyClick = (_id, onClick) => () => onClick(_id);

const List = props => {
  const {className, users, onDelete, onClick} = props;

  return (
    <MUIList className={ClsNames('list md-content', className)}>
      {users.map(user => {
        const {_id, email, firstName, lastName} = user;
        return (
          <ListItem
            key={_id}
            className="list-item"
            button={!!onClick}
            onClick={onClick && applyClick(_id, onClick)}
          >
            <ListItemText
              primary={`${firstName} ${lastName}`}
              secondary={email}
            />
            {onDelete && (
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="Supprimer"
                  onClick={applyClick(_id, onDelete)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        );
      })}
    </MUIList>
  );
};

List.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    })
  ),
  onDelete: PropTypes.func,
  onClick: PropTypes.func
};

List.defaultProps = {
  users: [],
  onClick: null,
  onDelete: null
};
export default withTracker(() => ({
  users: Users.find({}).fetch()
}))(List);
