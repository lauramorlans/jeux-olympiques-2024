import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./theme";
import MainLayout from './components/MainLayout'
import PrivateRoute from './components/PrivateRoute'
import AccountPage from './pages/AccountPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import NoAccessLoginPage from './pages/NoAccessLoginPage'
import NoAccessRolePage from './pages/NoAccessRolePage'
import store from './redux/store'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route element={<PrivateRoute isLoggedIn />}>
                <Route path="/account" element={<AccountPage />} />
              </Route>
              <Route element={<PrivateRoute isAdmin />}>
                <Route path="/dashboard" element={<DashboardPage />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/no-access-login" element={<NoAccessLoginPage />} />
              <Route path="/no-access-role" element={<NoAccessRolePage />} />
            </Routes>
          </MainLayout>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
