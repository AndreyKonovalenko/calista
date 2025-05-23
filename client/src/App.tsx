import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router';

import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/protected-route/protected-route';
import MainPage from './pages/main-page/main-page';
import BoardPage from './pages/board-page/board-page';
import MainLayout from './layout/MainLayout';
import AuthLayout from './layout/AuthLayout';
import LoginPage from './pages/login-page/login-page';
import RegisterPage from './pages/register-page/register-page';
import NotFoundPage from './pages/page-not-found/page-not-found';
import CardPage from './pages/card-page/card-page';
import ModalPortal from './components/modal-portal/modal-portal';

const App = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
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
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="boards/:id/cards/:id"
            element={
              <ProtectedRoute
                element={
                  <ModalPortal onModalClose={() => navigate(-1)}>
                    <CardPage />
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
