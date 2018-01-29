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

import Computers from '../../../api/computers';

const applyClick = (_id, onClick) => () => onClick(_id);

const List = props => {
  const {className, computers, onDelete, onClick} = props;

  return (
    <MUIList className={ClsNames('list md-content', className)}>
      {computers.map(user => {
        const {_id, name, description} = user;
        return (
          <ListItem
            key={_id}
            className="list-item"
            button={!!onClick}
            onClick={onClick && applyClick(_id, onClick)}
          >
            <ListItemText primary={name} secondary={description} />
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
  computers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  ),
  onDelete: PropTypes.func,
  onClick: PropTypes.func
};

List.defaultProps = {
  computers: [],
  onClick: null,
  onDelete: null
};
export default withTracker(() => ({
  computers: Computers.find({}).fetch()
}))(List);
