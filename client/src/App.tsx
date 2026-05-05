import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/protected-route/protected-route';
import MainPage from './pages/main-page/main-page';
import BoardPage from './pages/board-page/board-page';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/login-page/login-page';
import RegisterPage from './pages/register-page/register-page';
import NotFoundPage from './pages/page-not-found/page-not-found';
import CardPage from './pages/card-page/card-page';
import CardPageOnBackground from './pages/card-page/card-page-on-background';
import ModalPortal from './components/modal-portal/modal-portal';
import ErrorPage from './pages/error-page/error-page';
import VerificationPage from './pages/verification-pages/verification-page';
import PendingEmailVerificationPage from './pages/verification-pages/pending-email-verification-page';
import UserLayout from './layouts/UserLayout';
import UserProfilePage from './pages/user-pages/user-porfile-paage';
import UserEmailPage from './pages/user-pages/user-email-page';

const App = (): JSX.Element => {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <React.Fragment>
      <Routes location={background || location}>
        <Route element={<MainLayout />}>
          <Route index element={<ProtectedRoute element={<MainPage />} />} />
          <Route
            path="boards/:id"
            element={<ProtectedRoute element={<BoardPage />} />}
          />
          <Route
            path="boards/:boardId/lists/:listId/cards/:id"
            element={
              <ProtectedRoute
                element={
                  <ModalPortal>
                    <CardPage />
                  </ModalPortal>
                }
              />
            }
          />
        </Route>
        <Route element={<ProtectedRoute element={<UserLayout />} />}>
          <Route path="user">
            <Route index element={<Navigate to="profile" />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="email" element={<UserEmailPage />} />
            <Route path="security" element={<div>Security</div>} />
            <Route path="account" element={<div>Account</div>} />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="verify-email" element={<VerificationPage />} />
          <Route path="verify-pending_email" element={<PendingEmailVerificationPage/>} /> 
          <Route path="register" element={<RegisterPage />} />
          <Route path="error-page" element={<ErrorPage />} />
          <Route path="not-found" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="boards/:boardId/lists/:listId/cards/:id"
            element={
              <ProtectedRoute
                element={
                  <ModalPortal>
                    <CardPageOnBackground />
                  </ModalPortal>
                }
              />
            }
          />
        </Routes>
      )}
    </React.Fragment>
  );
};

export default App;
