import React from 'react';
import { IndexLink, Link } from 'react-router';

export const Sidebar = () => (
  <aside className="sidebar">
    <h1>PackList</h1>

    <ul className="nav nav-pills nav-stacked">
      <li className="active">
        <IndexLink to="/" activeClassName="active">Last Hurrah</IndexLink>
      </li>
      <li><Link to="/lists/2" activeClassName="active">List 2</Link></li>
      <li><Link to="/lists/3" activeClassName="active">List 3</Link></li>
    </ul>
  </aside>
)
