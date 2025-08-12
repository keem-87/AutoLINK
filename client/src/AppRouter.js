import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegisterPagejs from './RegisterPagejs';
import LoginPagejs from './LoginPagejs';
import BookingPagejs from './BookingPagejs';
import RatesPagejs from './RatesPagejs';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import About from './pages/About';
import Gallery from './pages/Gallery';

function AppRouter() {
  return React.createElement(
    Router,
    null,
    React.createElement(
      Routes,
      null,
      React.createElement(Route, { path: '/', element: React.createElement(Home) }),
      React.createElement(Route, { path: '/register', element: React.createElement(RegisterPagejs) }),
      React.createElement(Route, { path: '/login', element: React.createElement(LoginPagejs) }),
      React.createElement(Route, { path: '/booking', element: React.Services(BookingPagejs) }),
      React.createElement(Route, { path: '/rates', element: React.createElement(RatesPagejs) }),
      React.createElement(Route, { path: '/services', element: React.Services(Services) }),
      React.createElement(Route, { path: '/pricing', element: React.createElement(Pricing) }),
      React.createElement(Route, { path: '/faq', element: React.createElement(Faq) }),
      React.createElement(Route, { path: '/contact', element: React.createElement(Contact) }),
      React.createElement(Route, { path: '/about', element: React.createElement(About) }),
      React.createElement(Route, { path: '/gallery', element: React.createElement(Gallery) })
    )
  );
}

export default AppRouter;
