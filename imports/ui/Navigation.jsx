import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { IndexLink, Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Trips } from '../api/trips.js';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  renderTrips() {
    return this.props.trips.map((trip) => {
      const url = `/trips/${trip._id}`;

      return (
        <li key={trip._id}>
          <Link to={url}>{trip.title}</Link>
        </li>
      );
    });
  }

  render() {
    return (
      <nav className="navbar navbar-full navbar-dark bg-inverse">
        <div className="container">
          <IndexLink to='/' className="navbar-brand">PackList</IndexLink>
          <div className="nav navbar-nav">
            <Link to="/trips/new/" activeClassName="active" className="nav-item nav-link">New Trip</Link>
            <div className="text-xs-right">
              <AccountsUIWrapper />
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

Sidebar.propTypes = {
  trips: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('trips');

  return {
    trips: Trips.find({}).fetch()
  };
}, Sidebar);
