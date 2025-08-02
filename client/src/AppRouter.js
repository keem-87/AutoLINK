import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homejsx from './components/Homejsx';
import RegisterPagejs from './RegisterPagejs';
import LoginPagejs from './LoginPagejs';

function AppRouter() {
  // Use React.createElement instead of JSX to avoid angle bracket issues in this file.
  return React.createElement(
    Router,
    null,
    React.createElement(
      Routes,
      null,
      React.createElement(Route, { path: '/', element: React.createElement(Homejsx) }),
      React.createElement(Route, { path: '/register', element: React.createElement(RegisterPagejs) }),
      React.createElement(Route, { path: '/login', element: React.createElement(LoginPagejs) })
    )
  );
}

export default AppRouter;

