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
      <div className="trip component">
        <div className="heading">
          <h1 className="display-3">{trip.title}</h1>
          <h2>{trip.location}</h2>

          <ul className="activities">
            {this.renderActivities()}
          </ul>
        </div>

        <hr></hr>

        <List params={{tripId: trip._id}} currentUser={this.props.currentUser}/>
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
