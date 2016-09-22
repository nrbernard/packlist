import React from 'react';
import { Link } from 'react-router';

export const Home = () => (
  <div className="jumbotron text-xs-center">
    <h1 className="display-1">PackList</h1>
    <p className="lead">All the stuff that's fit to pack!</p>
    <Link to="/register" className="btn btn-primary btn-lg">Plan Your Trip</Link>
  </div>
);
