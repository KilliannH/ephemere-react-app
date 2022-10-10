import './Navbar.css';
import React, { useState } from 'react';
import {Link} from "react-router-dom";
import constants from '../constants';
var classNames = require('classnames');

function Navbar({ username, logout }) {
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

  function buildNavbar() {
    if(username) {
      return(
      <div className="navbar-end">
        <div className={navClass} onClick={toggleDropdown}>
          <a className="navbar-link">{username}</a>

          <div className="navbar-dropdown">
            <Link className="navbar-item" to="/home" onClick={logout}>Logout</Link>
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
