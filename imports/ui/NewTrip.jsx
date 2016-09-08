import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router'
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// NewTrip component - creates a new trip
class NewTrip extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    e.preventDefault();

    const router = this.props.router;
    const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    const location = ReactDOM.findDOMNode(this.refs.location).value.trim();
    const activities = [ReactDOM.findDOMNode(this.refs.activity).value.trim()];
    const date = new Date(ReactDOM.findDOMNode(this.refs.date).value);
    const data = {
      title,
      location,
      activities,
      date
    }

    Meteor.call('trips.insert', data, (err, resp) => {
      if (err) return new Meteor.Error(err);

      router.push(`/trips/${resp}`);
    });
  }

  renderActivities() {
    const activities = ['camping'];

    return activities.map((activity) => {
      return (
        <div className="checkbox" key={activity}>
          <label>
            <input type="checkbox" ref="activity" value={activity} /> {activity.toUpperCase()}
          </label>
        </div>
      )
    });
  }

  render() {
    const date = new Date();

    return (
      <div className="row">
        <h2>New Trip</h2>

        <form className="form new-trip" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" ref="title" id="title" className="form-control" placeholder="Make it catchy" />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input type="text" ref="location" id="location" className="form-control" placeholder="Where are you going?" />
          </div>

          <div className="form-group">
            <label htmlFor="date">When are you going?</label>
            <input type="date" ref="date" id="date" className="form-control" />
          </div>

          <div className="form-group">
            <label htmlFor="activities">What are you doing?</label>
            {this.renderActivities()}
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-default">Create Trip</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(NewTrip);
