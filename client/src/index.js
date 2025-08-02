// index.js
// This is the entry point for the React application. It renders the
// AppRouter component (which defines the application's routes) into
// the DOM. StrictMode is used in development to highlight potential issues.

import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
