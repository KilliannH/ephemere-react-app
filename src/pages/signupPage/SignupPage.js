import './SignupPage.css';
import * as authService from "../../services/authService";
import { useNavigate, useLocation } from 'react-router-dom';
import {Link} from "react-router-dom";
import useAuth from '../../useAuth';

function SignupPage() {
    
    const { loginCB } = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();

    function doSignup() {
        /*return authService.login().then((res) => {
            loginCB(res);
            navigate(state?.path || '/dashboard');
        });*/
    }
    return (
        <section class="hero">
          <div class="hero-body custom-hero">
              <div class="container">
                <div class="columns is-5-tablet is-4-desktop is-3-widescreen">
                    <div class="column">
                        <form class="box">
                            <div class="field">
                                <label class="label">Email</label>
                                <div class="control has-icons-left">
                                    <input type="email" class="input" placeholder="e.g. jdoe@gmail.com" />
                                    <span class="icon is-small is-left">
                                        <i class="ion-email" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Password</label>
                                <div class="control has-icons-left">
                                    <input type="password" class="input" placeholder="*********" required />
                                    <span class="icon is-small is-left">
                                        <i class="ion-locked" />
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <button class="button is-success">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <p>Already have an account ? <Link to="/login">Login</Link></p>
              </div>
          </div>
      </section>
    );
}

export default SignupPage;
