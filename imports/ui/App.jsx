import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Navigation from './Navigation.jsx';

// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navigation />

        <div className="container">
          <div className="row">
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
};
