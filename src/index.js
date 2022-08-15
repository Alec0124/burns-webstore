import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Webstore from './Webstore';
import Admin from './admin/Admin';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/admin/*" element={<Admin />} />
      <Route exact path="/" element={<Navigate to="/home" />} />
      <Route path="/*" element={<Webstore />} />
    </Routes>
  </Router>
);