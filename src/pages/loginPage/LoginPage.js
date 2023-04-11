import './LoginPage.css';
import * as authService from "../../services/authService";
import { useNavigate, useLocation } from 'react-router-dom';
import {Link} from "react-router-dom";
import useAuth from '../../useAuth';

function LoginPage() {
    
    const { loginCB } = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();

    function doLogin(event) {
        event.preventDefault();
        const credentials = {
            email: event.target.email.value,
            password: event.target.password.value
        };

        return authService.login(credentials).then((res) => {
            loginCB(res);
            navigate(state?.path || '/dashboard');
        });
    }
    return (
        <section className="hero">
          <div className="hero-body custom-hero">
              <div className="container">
                <div className="columns is-5-tablet is-4-desktop is-3-widescreen">
                    <div className="column">
                        <form className="box" onSubmit={doLogin}>
                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control has-icons-left">
                                    <input name="email" type="email" className="input" placeholder="e.g. jdoe@gmail.com" />
                                    <span className="icon is-small is-left">
                                        <i className="ion-email" />
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control has-icons-left">
                                    <input name="password" type="password" className="input" placeholder="*********" required />
                                    <span className="icon is-small is-left">
                                        <i className="ion-locked" />
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="checkbox">
                                    <input type="checkbox" />
                                    <span>&nbsp;</span>Remember me
                                </label>
                            </div>
                            <div className="field">
                                <button className="button is-success">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <p>You don't have an account ? <Link to="/signup">Sign up</Link> instead.</p>
              </div>
          </div>
      </section>
    );
}

export default LoginPage;
