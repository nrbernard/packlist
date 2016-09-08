import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { IndexLink, Link } from 'react-router';

import { Lists } from '../api/lists.js';
import List from './List.jsx';

// Lists component - displays lists
class ListsDisplay extends Component {
  constructor(props) {
    super(props);
  }

  renderLists() {
    return this.props.lists.map((list) => {
      const url = `/lists/${list._id}`;

      return (
        <Link to={url} key={list._id}>
          <div className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src="/images/bruegel.jpg" className="img-responsive" />
              <div className="caption">
                <h3>{list.title}</h3>
              </div>
            </div>
          </div>
        </Link>
      );
    });
  }

  render() {
    return (
      <div className="row">
        {this.renderLists()}
      </div>
    );
  }
}

ListsDisplay.propTypes = {
  lists: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('lists');
  return {
    lists: Lists.find({}).fetch()
  };
}, ListsDisplay);
