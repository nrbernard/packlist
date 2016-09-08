import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.jsx';
import ListsDisplay from '../imports/ui/ListsDisplay.jsx';
import List from '../imports/ui/List.jsx';
import NewTrip from '../imports/ui/NewTrip.jsx';

import { NotFound } from '../imports/ui/pages/not-found.jsx';

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ ListsDisplay } />
        <Route path="/lists/:listId" component={ List } />
        <Route path="/trips/new" component={ NewTrip } />
      </Route>
      <Route path="*" component={ NotFound } />
    </Router>,
    document.getElementById('app'));
});
