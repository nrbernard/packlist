import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Sidebar } from './Sidebar.jsx';

// App component - represents the whole app
export const App = ( { children } ) => (
  <div className="row">
    <div className="col-sm-3">
      <Sidebar />
    </div>

    <div className="col-sm-9">
      { children }
    </div>
  </div>
);
