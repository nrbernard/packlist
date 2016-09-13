import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import '../imports/startup/accounts-config.js';

import App from '../imports/ui/App.jsx';
import NewTrip from '../imports/ui/NewTrip.jsx';
import Trip from '../imports/ui/Trip.jsx';

import { Home } from '../imports/ui/pages/home.jsx';
import { NotFound } from '../imports/ui/pages/not-found.jsx';

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Home } />
        <Route path="/trips/new" component={ NewTrip } />
        <Route path="/trips/:tripId" component={ Trip } />
      </Route>
      <Route path="*" component={ NotFound } />
    </Router>,
    document.getElementById('app'));
});
