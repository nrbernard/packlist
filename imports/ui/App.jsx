import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Sidebar from './Sidebar.jsx';

// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-3">
          <Sidebar />
        </div>

        <div className="col-sm-9 wrapper">
          { this.props.children }
        </div>
      </div>
    )
  }
};
