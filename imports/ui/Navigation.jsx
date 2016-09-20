import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { IndexLink, Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import AccountLink from './AccountLink.jsx';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navigation navbar navbar-full navbar-dark bg-inverse">
        <div className="container">
          <IndexLink to='/' className="navbar-brand">PackList</IndexLink>

          <div className="nav navbar-nav">
            <Link to="/trips" activeClassName="active" className="nav-item nav-link">Trips</Link>
          </div>

          <div className="nav navbar-nav pull-xs-right">
            {Meteor.user() ?
              <AccountLink email={Meteor.user().emails[0].address}/> :
              <Link to="/login"className="nav-item nav-link">Login</Link>
            }
          </div>
        </div>
      </nav>
    )
  }
}

export default NavigationContainer = createContainer(() => {
  return {
    currentUser: Meteor.user()
  };
}, Navigation);
