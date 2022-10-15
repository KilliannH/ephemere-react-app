import './Navbar.css';
import React, { useState } from 'react';
import useAuth from '../../useAuth';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";
import * as authService from "../../services/authService";
import constants from '../../constants';
var classNames = require('classnames');

function Navbar() {

  const { connUser, logoutCB } = useAuth();
  const navigate = useNavigate();

  const username = connUser?.sub;
  const [dropdownActive, setDropdownActive] = useState(false);

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
    return authService.logout().then(() => {
      logoutCB();
      navigate('/')
    });
  }

  function buildNavbar() {
    if(username) {
      return(
      <>
      <div className="navbar-start">
          <Link className="navbar-item" to="/dashboard">Dashboard</Link>
      </div>
      <div className="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-link">
              <strong>New event</strong>
            </a>
          </div>
        </div>
        <div className={navClass} onClick={toggleDropdown}>
          <a className="navbar-link">{username}</a>

          <div className="navbar-dropdown">
            <Link className="navbar-item" to="/home" onClick={doLogout}>Logout</Link>
          </div>
        </div>
      </div>
      </>
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
        <Link className="navbar-item navbar-main" to="/">
          <img src={process.env.PUBLIC_URL + '/assets/logo_v2.png'} alt="Ephemeral logo" /> {appName}
        </Link>
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
      </div>
      <div id="navMenu" className="navbar-menu">
        {buildNavbar()}
      </div>
    </nav>
  );
}

export default Navbar;
