import './Navbar.css';
import * as config from '../config';

function Navbar(props) {

  const appName = config.appName;

  function buildNavbar() {
    if(props.username) {
      return(
      <div className="navbar-end">
        <div className="navbar-item has-dropdown">
          <button className="navbar-link" href="#">
            {props.username}
          </button>

          <div className="navbar-dropdown">
            <a className="navbar-item" href="/home">
              Logout
            </a>
          </div>
        </div>
      </div>
      );
    } else {
      return(
        <div className="navbar-end">
          <a className="navbar-item" href="/login">Login</a>
        </div>
      );
    }
  }

  return (
    <nav id="navbar" className="bd-navbar navbar">
      <div className="navbar-brand">
        <a className="navbar-item navbar-main" href="/home">{appName}</a>
      </div>
      <div id="navMenu" className="navbar-menu">
        {buildNavbar()}
      </div>
    </nav>
  );
}

export default Navbar;
