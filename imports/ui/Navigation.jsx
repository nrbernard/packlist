import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { IndexLink, Link } from 'react-router';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

const Navigation = (props) =>
  <nav className="navbar navbar-full navbar-dark bg-inverse">
    <div className="container">
      <IndexLink to='/' className="navbar-brand">PackList</IndexLink>

      <div className="nav navbar-nav">
        <Link to="/trips" activeClassName="active" className="nav-item nav-link">Trips</Link>
        <div className="text-xs-right">
          <AccountsUIWrapper />
        </div>
      </div>
    </div>
  </nav>

export default Navigation
