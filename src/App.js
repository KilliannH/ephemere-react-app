import 'bulma/css/bulma.min.css';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React, { useState } from 'react';
import constants from './constants';
import * as authService from './services/authService';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

import Navbar from './navbar/Navbar';
import HomePage from './homePage/HomePage';
import LoginPage from './loginPage/LoginPage';
import DashboardPage from './dashboardPage/DashboardPage';

function RequireAuth({authed, children}) {
  console.log(authed);

  return authed && authed.sub ? children : <Navigate to="/login" replace />;
}

function initConnection(setUsername, loginCB, logoutCB) {
  
  return authService.initFbConnection().then((res) => {
    console.log("FB initialized", res);
    const accessToken = localStorage.getItem(constants.lsTokenKey);
      if(res.status === "connected") {
        if(!accessToken) {
          // no token in LS
          return authService.apiLogin({
            sub: {
              facebookId: res.authResponse.userID,
              accessToken: res.authResponse.accessToken
            },
            issuer: constants.appName}).then((connUser) => {
              console.log("Connected with FB user: ", connUser);
              setUsername(connUser.sub);
              loginCB();
          });
        } else {
          // get token from ls
          const decoded = authService.decodeToken();
          console.log("token from ls", decoded);
          setUsername(decoded.sub);
          loginCB();
        }
      } else {
        // If Fb doesn't approve connection,
        // we remove the localStorage token if any
        if(accessToken) {
          return authService.logout(setUsername).then(() => logoutCB());
        }
      }
  });
}

function App() {

  const [username, setUsername] = useState(null);
  const { authed, loginCB, logoutCB } = useAuth();
  console.log(authed);

  initConnection(setUsername, loginCB, logoutCB);
  return (
    <>
          <BrowserRouter>
              <Navbar username={username} logout={() => authService.logout(setUsername).then(() => logoutCB())}/>
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
