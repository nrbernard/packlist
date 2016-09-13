import React from 'react';
import { Link } from 'react-router';

export const Home = () => (
  <div className="jumbotron">
    <h1>PackList</h1>
    <p>All the stuff that's fit to pack!</p>
    <Link to="/trips/new" className="btn btn-primary btn-lg">Plan Your Trip</Link>
  </div>
);
