import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Trips } from '../api/trips.js';

class TripsIndex extends Component {
  constructor(props) {
    super(props);
  }

  renderTrips() {
    return this.props.trips.map((trip) => {
      const url = `/trips/${trip._id}`;

      return (
        <div key={trip._id} className="col-sm-4">
          <div className="card">
            <img className="card-img-top img-fluid" src="images/bruegel.jpg" alt={trip.location} />
            <div className="card-block">
              <h2 className="card-title">{trip.title}</h2>
              <p className="lead">{trip.location}</p>
              <Link to={url} className="btn btn-primary">View Trip</Link>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="trips component">
        <h1>Trips</h1>
        <p className="lead">Here's where you're going.</p>
        <Link to="/trips/new" className="btn btn-primary btn-lg">Plan Your Trip</Link>

        <hr></hr>

        <h2>Upcomming Trips</h2>
        <div className="row">
          {this.renderTrips()}
        </div>
      </div>
    )
  }
}

TripsIndex.propTypes = {
  trips: PropTypes.array.isRequired,
};

export default TripsIndexContaner = createContainer(() => {
  Meteor.subscribe('trips');

  return {
    trips: Trips.find({}).fetch()
  };
}, TripsIndex);
