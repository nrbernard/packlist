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

        {this.props.itemsExist && <List tripId={trip._id} {...this.props} />}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.itemsExist) {
      let itemCategories = nextProps.items.map((item) => item.category).filter(category => !!category);
      const allCategories = itemCategories.concat(this.props.categories);
      this.setState({categories: _.uniq(allCategories)});
    }
  }
}

Trip.propTypes = {
  categories: PropTypes.array.isRequired
};

Trip.defaultProps = {
  categories: ['kitchen', 'sleeping', 'essentials']
};

export default TripContainer = createContainer((request) => {
  const tripId = request.params.tripId;
  const tripsSubscription = Meteor.subscribe('trips');
  const itemsSubscription = Meteor.subscribe('items');
  const trip = tripsSubscription.ready() ? Trips.find({_id: tripId}).fetch()[0] : {};
  const items = itemsSubscription.ready() ? Items.find({tripId: tripId}, { sort: { category: 1 } }).fetch() : [];
  const loading = !itemsSubscription.ready();
  const itemsExist = !loading && items.length > 0;

  return {
    trip,
    items,
    loading,
    itemsExist
  };
}, Trip);
