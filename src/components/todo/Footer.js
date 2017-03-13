import React from 'react';
import {Link} from '../router'; // shortened syntax via index.js in router directory

export const Footer = (props) => (
  <div className="Footer">
    <Link to="/">All</Link>
    <Link to="/active">Active</Link>
    <Link to="/complete">Complete</Link>
  </div>
);
