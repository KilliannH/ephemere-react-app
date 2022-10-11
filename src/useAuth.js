import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export function useAuth() {
  const [authed, setAuthed] = useState(false);

  return {
    authed,
    loginCB() {
      return new Promise((resolve) => {
        setAuthed(true);
        resolve();
      });
    },
    logoutCB() {
      return new Promise((res) => {
        setAuthed(false);
        resolve();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default function AuthConsumer() {
  return useContext(AuthContext);
}