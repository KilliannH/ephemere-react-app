import 'ionicons/css/ionicons.min.css';
import 'bulma/css/bulma.min.css';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import { AuthProvider, RequireAuth } from './useAuth';

import Navbar from './components/navbar/Navbar';
import HomePage from './pages/homePage/HomePage';
import LoginPage from './pages/loginPage/LoginPage';
import DashboardPage from './pages/dashboardPage/DashboardPage';

function App() {

  return (
    <AuthProvider>
          <BrowserRouter>
              <Navbar/>
              <Routes>
                <Route path={"/home"} element={<HomePage />} />
                <Route path={"/login"} element={<LoginPage />} />
                <Route path={"/dashboard"} element={
                <RequireAuth>
                  <DashboardPage />
                </RequireAuth>} />
                <Route path={"/"} element={<HomePage />} />
              </Routes>
          </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
