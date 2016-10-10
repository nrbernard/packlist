import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import crypto from 'crypto';
import Gravatar from './Gravatar.jsx'

export default class AccountLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to="/account" className="nav-item nav-link">
        <Gravatar email={this.props.email} /> {this.props.email}
      </Link>
    )
  }
}

AccountLink.propTypes = {
  email: React.PropTypes.string.isRequired
};
