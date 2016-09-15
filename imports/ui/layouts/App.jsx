import React from 'react';
import { Navigation } from '../Navigation.jsx';

export const App = (props) =>
  <div>
    <Navigation />

    <div className="container">
      <div className="row">
        { props.children }
      </div>
    </div>
  </div>
