import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import '../imports/startup/accounts-config.js';
import { App } from '../imports/ui/App.jsx';
import List from '../imports/ui/List.jsx';

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ List } />
      </Route>
    </Router>,
    document.getElementById('app'));
});
