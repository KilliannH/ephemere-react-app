import './Navbar.css';
import React, { useState } from 'react';
import {Link} from "react-router-dom";
import {AuthService} from '../services/authService';
import constants from '../constants';
var classNames = require('classnames');

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

function Navbar() {
  const authService = new AuthService();

  const [username, setUsername] = useState(null);
  const [dropdownActive, setDropdownActive] = useState(false);

  initConnection(setUsername, authService);

  let navClass = classNames({
    'navbar-item': true,
    'has-dropdown': true,
    'is-active': dropdownActive
  });

  const appName = constants.appName;

  function toggleDropdown() {
    setDropdownActive(!dropdownActive);
  }

  function doLogout() {
    authService.logout(setUsername);
  }

  function buildNavbar() {
    if(username) {
      return(
      <div className="navbar-end">
        <div className={navClass} onClick={toggleDropdown}>
          <a className="navbar-link">{username}</a>

          <div className="navbar-dropdown">
            <Link className="navbar-item" to="/home" onClick={doLogout}>Logout</Link>
          </div>
        </div>
      </div>
      );
    } else {
      return(
        <div className="navbar-end">
          <Link className="navbar-item" to="/login">Login</Link>
        </div>
      );
    }
  }

  return (
    <nav id="navbar" className="bd-navbar navbar">
      <div className="navbar-brand">
        <Link className="navbar-item navbar-main" to="/">{appName}</Link>
      </div>
      <div id="navMenu" className="navbar-menu">
        {buildNavbar()}
      </div>
    </nav>
  );
}

export default Navbar;
