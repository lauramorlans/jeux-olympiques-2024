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
import AboutPage from './pages/AboutPage'
import DashboardPage from './pages/DashboardPage'
import TicketsPage from './pages/TicketsPage'
import RegisterPage from './pages/RegisterPage'
import BasketPage from './pages/BasketPage'
import NoAccessLoginPage from './pages/NoAccessLoginPage'
import NoAccessRolePage from './pages/NoAccessRolePage'
import NotFoundPage from './pages/NotFoundPage'
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
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/tickets" element={<TicketsPage />} />
              <Route path="/basket" element={<BasketPage />} />
              <Route path="/no-access-login" element={<NoAccessLoginPage />} />
              <Route path="/no-access-role" element={<NoAccessRolePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </MainLayout>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
