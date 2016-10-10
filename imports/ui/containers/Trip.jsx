import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Trips } from '../../api/trips.js';
import { Items } from '../../api/items.js';

import List from '../components/List.jsx';

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

        {this.props.itemsExist && <List tripId={trip._id} currentUser={this.props.currentUser} items={this.props.items} categories={this.state.categories} />}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.itemsExist) {
      let categories = nextProps.items.map((item) => item.category).filter(category => !!category);
      this.setState({categories: _.uniq(categories)});
    }
  }
}

Trip.propTypes = {
  trip: PropTypes.object.isRequired
};

export default TripContainer = createContainer((request) => {
  const tripId = request.params.tripId;
  const tripsSubscription = Meteor.subscribe('trips');
  const itemsSubscription = Meteor.subscribe('items');
  const trip = tripsSubscription.ready() ? Trips.find({_id: tripId}).fetch()[0] : {};
  const items = itemsSubscription.ready() ? Items.find({tripId: tripId}, { sort: { createdAt: -1 } }).fetch() : [];
  const loading = !itemsSubscription.ready();
  const itemsExist = !loading && items.length > 0;

  return {
    trip,
    items,
    loading,
    itemsExist
  };
}, Trip);
