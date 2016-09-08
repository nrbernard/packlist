import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { IndexLink, Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Lists } from '../api/lists.js';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  renderLists() {
    return this.props.lists.map((list) => {
      const url = `/lists/${list._id}`;

      return (
        <li key={list._id}>
          <Link to={url}>{list.title}</Link>
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
          {this.renderLists()}
        </ul>
      </aside>
    )
  }
}

Sidebar.propTypes = {
  lists: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('lists');
  return {
    lists: Lists.find({}).fetch()
  };
}, Sidebar);
