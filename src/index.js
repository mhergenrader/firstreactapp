import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from './components/router';
import App from './App';
import './index.css';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
