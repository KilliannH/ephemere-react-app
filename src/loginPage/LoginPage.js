import './LoginPage.css';
import {AuthService} from '../services/authService';

function doLogin() {
  const authService = new AuthService();
  return authService.login().then((res) => {
    console.log("yyyy", res);
    // Todo -- redirect to /dashboard on success
    // update username on Navbar (maybe w. rxJs and no states are sent to Navbar)
    // retrieve states from Navbar directly
  });
}

function LoginPage() {

  return (
    <main className="form-signin container">
    <div className="section">
        <div className="box">
            <h1 className="header-text">Ephemeral a besoin de Facebook pour fonctionner,</h1>
            <p>vous devez avoir un compte Facebook pour utiliser l'application.</p>
            <div className="login-button-container">
            <a className="btn-fb" onClick={doLogin}>
                    <div className="fb-content">
                        <div className="logo">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 64 64" width="64px" height="64px"><path d="M32,6C17.641,6,6,17.641,6,32c0,12.999,9.54,23.769,22,25.693V40h-6v-7h6v-5c0-7,4-11,10-11c3.133,0,5,1,5,1v6h-4 c-2.86,0-4,2.093-4,4v5h7l-1,7h-6v17.822C47.945,56.334,58,45.344,58,32C58,17.641,46.359,6,32,6z"/></svg>
                        </div>
                        <p>Continue with Facebook</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</main>
  );
}

export default LoginPage;
