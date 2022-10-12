import { useState, createContext, useContext } from "react";
import constants from './constants';
import { Navigate, useLocation } from "react-router-dom";
import * as authService from './services/authService';

const AuthContext = createContext();

export function useAuth() {
  const [connUser, setConnUser] = useState(null);

  return {
    connUser,
    loginCB: (res) => {
      return new Promise((resolve) => {
        setConnUser(res);
        resolve();
      });
    },
    logoutCB: () => {
      return new Promise((resolve) => {
        setConnUser(null);
        resolve();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  function initConnection(loginCB, logoutCB) {
  
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
                loginCB(connUser);
            });
          } else {
            // get token from ls
            const decoded = authService.decodeToken();
            console.log("token from ls", decoded);
            loginCB(decoded);
          }
        } else {
          // If Fb doesn't approve connection,
          // we remove the localStorage token if any
          if(accessToken) {
            return authService.logout().then(() => logoutCB());
          }
        }
    });
  }

  initConnection(auth.loginCB, auth.logoutCB);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function RequireAuth({ children }) {
    const { connUser } = AuthConsumer();
    const location = useLocation();
  
    return connUser && connUser.sub ? (
      children
    ) : (
      <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
}

export default function AuthConsumer() {
    return useContext(AuthContext);
  }