import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Trips } from '../api/trips.js';
import List from './List.jsx';

// Trip component - displays a trip
class Trip extends Component {
  constructor(props) {
    super(props);
  }

  renderActivities() {
    if (typeof this.props.trip.activities !== 'undefined') {
      return this.props.trip.activities.map((activity) => {
        return <li key={activity}>{activity}</li>;
      });
    }
  }

  render() {
    const trip = this.props.trip;
    return (
      <div className="trip">
        <h2>{trip.title}</h2>
        <h3>{trip.location}</h3>
        {this.renderActivities()}

        <List params={{tripId: trip._id}} />
      </div>
    );
  }
}

Trip.propTypes = {
  trip: PropTypes.object.isRequired
};

export default TripContainer = createContainer((request) => {
  const tripId = request.params.tripId;
  const handle = Meteor.subscribe('trips');
  const trip = handle.ready() ? Trips.find({_id: tripId}).fetch()[0] : {};

  return {
    trip: trip,
  };
}, Trip);
