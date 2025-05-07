import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SidebarLayout from './layouts/SidebarLayout';
import BlankLayout from './layouts/BlankLayout';


import Home from './pages/Home';
import Profile from './pages/Profile';
import Setting from './pages/Setting';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Terms from './pages/Auth/Term';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SidebarLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Setting />} />
        </Route>

        <Route element={<BlankLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<Terms />} />
        </Route>

        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
