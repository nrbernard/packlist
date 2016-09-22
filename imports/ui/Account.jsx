import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export default class Account extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const email = this.props.currentUser.emails[0].address;
    return (
      <div className="component account">
        <h1>{email}</h1>
      </div>
    )
  }
}
