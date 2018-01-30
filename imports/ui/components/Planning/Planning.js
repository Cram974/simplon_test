import React, {Component} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import {compose, withState, withHandlers} from 'recompose';
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';

import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Tooltip from 'material-ui/Tooltip';

import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar/dist/fullcalendar.js';
import 'fullcalendar/dist/locale/fr';
import 'fullcalendar-scheduler/dist/scheduler';
import 'fullcalendar-scheduler/dist/scheduler.css';

import {withComputers} from '../Computers/List';
import CreateModal from './CreateModal';
import DetailsModal from './DetailsModal';
import Assignments from '../../../api/assignments';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: 2
  }
});

class Planning extends Component {
  constructor(props) {
    super(props);

    this.getEvents = this.getEvents.bind(this);
    this.getResources = this.getResources.bind(this);
    this.handleEventClick = this.handleEventClick.bind(this);
  }
  componentDidMount() {
    $('#planning').fullCalendar({
      defaultView: 'timelineDay',
      selectable: true,
      events: this.getEvents,
      resources: this.getResources(),
      businessHours: [
        // specify an array instead
        {
          dow: [1, 2, 3], // Monday, Tuesday, Wednesday
          start: '08:00', // 8am
          end: '18:00' // 6pm
        },
        {
          dow: [4, 5], // Thursday, Friday
          start: '10:00', // 10am
          end: '16:00' // 4pm
        }
      ],
      // other options go here...
      height: 'parent',
      eventClick: this.handleEventClick
    });

    this.api = $('#planning').data('fullCalendar');
  }
  componentDidUpdate(prevProps) {
    if (prevProps.computers !== this.props.computers) {
      this.api.resourceManager.setResources(this.getResources());
    }

    this.api.refetchEvents();
  }
  getResources() {
    const {computers} = this.props;
    return (
      (computers && computers.map(({name, _id}) => ({id: _id, title: name}))) ||
      []
    );
  }
  getEvents(start, end, timezone, callback) {
    const {assignments} = this.props;

    callback(
      assignments.map(({_id, computerId, from, to, user}) => ({
        id: _id,
        resourceId: computerId,
        title: user && `${user.firstName} ${user.lastName}`,
        start: from,
        end: to
      }))
    );
  }
  handleEventClick(event, jsEvent, view) {
    const {setDetails} = this.props;
    setDetails(event.id);
  }
  render() {
    const {
      classes,
      details,
      setDetails,
      open,
      openModal,
      closeModal
    } = this.props;
    return (
      <div className="layout-fill layout-column">
        <CreateModal open={open} onClose={closeModal} />
        <DetailsModal
          open={!!details}
          id={details}
          onClose={() => setDetails(null)}
          onDelete={() => {
            Meteor.call('assignments.remove', details, error => {
              setDetails(null);
            });
          }}
        />
        <div className="margin-1 flex">
          <div id="planning" />
        </div>
        <Tooltip title="Ajouter une attribution" placement="left">
          <Button
            fab
            className={classes.fab}
            color="primary"
            onClick={openModal}
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </div>
    );
  }
}

Planning.propTypes = {
  classes: PropTypes.object.isRequired,
  details: PropTypes.array.isRequired,
  setDetails: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default compose(
  withStyles(styles),
  withState('open', 'setOpen', false),
  withHandlers({
    openModal: ({setOpen}) => () => setOpen(true),
    closeModal: ({setOpen}) => () => setOpen(false)
  }),
  withState('details', 'setDetails', null),
  withComputers,
  withTracker(() => {
    const res = Assignments.find({}).fetch();
    return {
      assignments: res
    };
  })
)(Planning);
