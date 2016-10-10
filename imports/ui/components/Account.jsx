import React from 'react';
import { Link, withRouter } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class Account extends React.Component {
  logout() {
    Meteor.logout(() => this.props.router.push('/'))
  }

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  render() {
    const email = this.props.currentUser.emails[0].address;
    return (
      <div className="component account">
        <h1>{email}</h1>

      <button className="btn btn-danger" onClick={this.logout}>Logout</button>
      </div>
    )
  }
}

export default withRouter(Account);
