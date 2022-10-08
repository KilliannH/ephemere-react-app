import 'bulma/css/bulma.min.css';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React, { useState } from 'react';

import Navbar from './navbar/Navbar';
import HomePage from './homePage/HomePage';
import LoginPage from './loginPage/LoginPage';
import DashboardPage from './dashboardPage/DashboardPage';
import {AuthService} from './services/authService';
import constants from "./constants";

function initConnection(setUsername) {
  const authService = new AuthService();
  
  return authService.initFbConnection().then((res) => {
    console.log("FB initialized", res);
      if(res.status === "connected") {
        if(!authService.accessToken) {
          // no token in LS
          return authService.apiLogin({
            sub: {
              facebookId: res.authResponse.userID,
              accessToken: res.authResponse.accessToken
            },
            issuer: constants.appName}).then((connUser) => {
              console.log("Connected with FB user: ", connUser);
              setUsername(connUser.sub);
          });
        } else {
          // get token from ls
          const decoded = authService.decodeToken(authService.accessToken);
          console.log("token from ls", decoded);
          setUsername(decoded.sub)
        }
      } else {
        // If Fb doesn't approve connection,
        // we remove the localStorage token if any
        if(authService.accessToken) {
          return authService.logout();
        }
      }
  });
}

function App() {
  const [username, setUsername] = useState(null);
  initConnection(setUsername);
  return (
    <>
          <BrowserRouter>
              <Navbar username={username} />
              <Routes>
                <Route path={"/home"} element={<HomePage />} />
                <Route path={"/login"} element={<LoginPage />} />
                <Route path={"/dashboard"} element={<DashboardPage />} />
                <Route path={"/"} element={<HomePage />} />
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
