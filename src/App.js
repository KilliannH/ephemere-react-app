import 'bulma/css/bulma.min.css';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React, { useState } from 'react';
import constants from './constants';
import { AuthService } from './services/authService';

import Navbar from './navbar/Navbar';
import HomePage from './homePage/HomePage';
import LoginPage from './loginPage/LoginPage';
import DashboardPage from './dashboardPage/DashboardPage';

function initConnection(setUsername, authService) {
  
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
  const authService = new AuthService();

  const [username, setUsername] = useState(null);

  initConnection(setUsername, authService);
  return (
    <>
          <BrowserRouter>
              <Navbar username={username} logout={() => authService.logout(setUsername)}/>
              <Routes>
                <Route path={"/home"} element={<HomePage />} />
                <Route path={"/login"} element={<LoginPage login={() => authService.login(setUsername)} />} />
                <Route path={"/dashboard"} element={<DashboardPage />} />
                <Route path={"/"} element={<HomePage />} />
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
