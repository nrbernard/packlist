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
      <aside className="sidebar">
        <IndexLink to='/'>
          <h1>PackList</h1>
        </IndexLink>

        <AccountsUIWrapper />

        <ul className="nav nav-pills nav-stacked">
          {this.renderTrips()}
        </ul>
      </aside>
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
