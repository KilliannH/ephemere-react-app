import { useState, createContext, useContext } from "react";
import constants from './constants';
import * as jose from "jose";
import { Navigate, useLocation } from "react-router-dom";
import * as authService from './services/authService';
import * as dataService from './services/dataService';

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
  
    return () => {
      const accessToken = localStorage.getItem(constants.lsTokenKey);
        if(!accessToken) {
            // no token in LS
            logoutCB();
        } else {
          // get token from ls
          const decoded = jose.decodeJwt(accessToken);
          console.log("token from ls", decoded);
            // get user from be
            dataService.getUserById(decoded.id).then(({ data }) => {
              console.log("getUserById", data);
              loginCB(data);
            }).catch(({response}) => {
              if(response.status === 401) {
                // backend revoqued the token, so we logout the user.
                
                // TODO --
                // need to verify if facebook recognize the user, if so
                // try to sneaky refresh the token
                // else logout the user
                return authService.logout().then(() => {
                  logoutCB();
                });
              }
            });
          }
    }
  }

  initConnection(auth.loginCB, auth.logoutCB);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function RequireAuth({ children }) {
    const { connUser } = AuthConsumer();
    const location = useLocation();
  
    return connUser && connUser.username ? (
      children
    ) : (
      <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
}

export default function AuthConsumer() {
    return useContext(AuthContext);
}