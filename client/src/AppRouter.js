// AppRouter.js
// This component defines client-side routing for the Shelter-Stead React app.
// It uses react-router-dom to map paths to page components. Ensure
// component filenames match import names (e.g. Homejsx, Registerjs, Login). If you rename
// components (e.g. Register.js), update imports accordingly.

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components. Note: "Registerjs" reflects the file name created earlier.
import Homejsx from './components/Homejsx';
import Registerjs from './components/Registerjs';
import Login from './components/Login';

// The AppRouter component wraps the app in a Router and defines routes.
function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Root path shows the homepage */}
        <Route path="/" element={<Homejsx />} />
        {/* Registration form */}
        <Route path="/register" element={<Registerjs />} />
        {/* Login form with optional 2FA */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
