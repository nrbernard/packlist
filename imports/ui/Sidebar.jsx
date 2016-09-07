import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { IndexLink, Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  render() {
    return (
      <aside className="sidebar">
        <h1>PackList</h1>

        <ul className="nav nav-pills nav-stacked">
          <li className="active">
            <IndexLink to="/" activeClassName="active">Last Hurrah</IndexLink>
          </li>
          <li><Link to="/lists/2" activeClassName="active">List 2</Link></li>
          <li><Link to="/lists/3" activeClassName="active">List 3</Link></li>
        </ul>
      </aside>
    )
  }
}
