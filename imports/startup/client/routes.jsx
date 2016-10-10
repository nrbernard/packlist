import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Data containers
import App from '../../ui/containers/App.jsx';
import Trip from '../../ui/containers/Trip.jsx';

// Auth pages
import AuthRegister from '../../ui/components/AuthRegister.jsx';
import AuthLogin from '../../ui/components/AuthLogin.jsx';

// Account Pages
import Account from '../../ui/components/Account.jsx';

// Trip pages
import NewTrip from '../../ui/components/NewTrip.jsx';
import TripsIndex from '../../ui/components/TripsIndex.jsx';

// Static pages
import { Home } from '../../ui/pages/home.jsx';
import { NotFound } from '../../ui/pages/not-found.jsx';

export const routes = () =>
  <Router history={ browserHistory }>
    <Route path="/" component={ Home } />
    <Route path="/register" component={ AuthRegister } />
    <Route path="/login" component={ AuthLogin } />
    <Route component={ App }>
      <Route path="/trips" component={ TripsIndex } />
      <Route path="/trips/new" component={ NewTrip } />
      <Route path="/trips/:tripId" component={ Trip } />
      <Route path="/account" component={ Account } />
    </Route>
    <Route path="*" component={ NotFound } />
  </Router>
