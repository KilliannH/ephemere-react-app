import 'bulma/css/bulma.min.css';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './useAuth';

import Navbar from './navbar/Navbar';
import HomePage from './homePage/HomePage';
import LoginPage from './loginPage/LoginPage';
import DashboardPage from './dashboardPage/DashboardPage';

function App() {

  return (
    <AuthProvider>
          <BrowserRouter>
              <Navbar/>
              <Routes>
                <Route path={"/home"} element={<HomePage />} />
                <Route path={"/login"} element={<LoginPage />} />
                <Route path={"/dashboard"} element={<DashboardPage />} />
                <Route path={"/"} element={<HomePage />} />
              </Routes>
          </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
