import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// layouts
import App from '../../ui/layouts/App.jsx';

// Auth pages
import AuthRegister from '../../ui/AuthRegister.jsx';
import AuthLogin from '../../ui/AuthLogin.jsx';

// Account Pages
import Account from '../../ui/Account.jsx';

// Trip pages
import NewTrip from '../../ui/NewTrip.jsx';
import Trip from '../../ui/Trip.jsx';
import TripsIndex from '../../ui/TripsIndex.jsx';

// Static pages
import { Home } from '../../ui/pages/home.jsx';
import { NotFound } from '../../ui/pages/not-found.jsx';

export const routes = () =>
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ Home } />
      <Route path="/trips/new" component={ NewTrip } />
      <Route path="/trips" component={ TripsIndex } />
      <Route path="/trips/:tripId" component={ Trip } />
      <Route path="/register" component={ AuthRegister } />
      <Route path="/login" component={ AuthLogin } />
      <Route path="/account" component={ Account } />
    </Route>
    <Route path="*" component={ NotFound } />
  </Router>
