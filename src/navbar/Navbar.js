import './Navbar.css';
import {Link} from "react-router-dom";
import constants from '../constants';

function Navbar(props) {

  const appName = constants.appName;

  function buildNavbar() {
    if(props.username) {
      return(
      <div className="navbar-end">
        <div className="navbar-item has-dropdown">
          <Link className="navbar-link" to="/">{props.username}</Link>

          <div className="navbar-dropdown">
            <Link className="navbar-item" to="/home">Logout</Link>
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
