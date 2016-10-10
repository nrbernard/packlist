import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Navigation from '../components/Navigation.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const children = React.Children.map(this.props.children, (child) => {
      if (Meteor.user()) {
        return React.cloneElement(child, {currentUser: this.props.currentUser});
      } else {
        return (
          <div className="loading">
            <div className="text-xs-center" id="loading-caption">Loading...</div>
            <progress className="progress" value="75" max="100" aria-describedby="loading-caption"></progress>
          </div>
        )
      }
    });

    return(
      <div className="app-container">
        {Meteor.user() && <Navigation {...this.props} />}

        <div className="container">
          <div className="row">
            { children }
          </div>
        </div>
      </div>
    )
  }
}

export default AppContainer = createContainer(() => {
  return {
    currentUser: Meteor.user()
  };
}, App);
