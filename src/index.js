import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Webstore from './Webstore';
import Admin from './Admin';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<Webstore />} />
        
      <Route path="/admin/*" element={<Admin />} />
      </Routes>
  </Router>
);