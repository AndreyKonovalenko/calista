import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import UserLayout from './layouts/UserLayout';

// Lazy load pages for better performance
const MainPage = lazy(() => import('./pages/main-page/main-page'));
const BoardPage = lazy(() => import('./pages/board-page/board-page'));
const LoginPage = lazy(() => import('./pages/login-page/login-page'));
const RegisterPage = lazy(() => import('./pages/register-page/register-page'));
const NotFoundPage = lazy(
  () => import('./pages/page-not-found/page-not-found'),
);
const CardPage = lazy(() => import('./pages/card-page/card-page'));
const ErrorPage = lazy(() => import('./pages/error-page/error-page'));
const VerificationPage = lazy(
  () => import('./pages/verification-pages/verification-page'),
);
const PendingEmailVerificationPage = lazy(
  () => import('./pages/verification-pages/pending-email-verification-page'),
);
const UserProfilePage = lazy(
  () => import('./pages/user-pages/user-profile-page'),
);
const UserEmailPage = lazy(() => import('./pages/user-pages/user-email-page'));
const UserSecurityPage = lazy(
  () => import('./pages/user-pages/user-security-page'),
);

// Components
import ProtectedRoute from './components/protected-route/protected-route';
import ModalPortal from './components/modal-portal/modal-portal';
import LoadingBage from './components/loading-bage/loading-bage';

// routes
import { ROUTES } from './utils/router-paths';
import { useAxiosInterceptor } from './hooks/useAxiosInterceptor';

const App = (): JSX.Element => {
  const location = useLocation();
  const background = location.state?.background;

  useAxiosInterceptor();

  return (
    <Suspense fallback={<LoadingBage />}>
      <Routes location={background || location}>
        {/* Public routes with AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.VERIFY_EMAIL} element={<VerificationPage />} />
          <Route
            path={ROUTES.VERIFY_PENDING}
            element={<PendingEmailVerificationPage />}
          />
          <Route path={ROUTES.ERROR} element={<ErrorPage />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
          <Route
            path="*"
            element={<Navigate to={ROUTES.NOT_FOUND} replace />}
          />
        </Route>

        {/* Protected routes with MainLayout */}
        <Route element={<ProtectedRoute element={<MainLayout />} />}>
          <Route index element={<MainPage />} />
          <Route path={ROUTES.BOARD_PATTERN} element={<BoardPage />} />
          <Route path={ROUTES.CARD_PATTERN} element={<ModalPortal><CardPage /></ModalPortal>} />
        </Route>

        {/* Protected user routes with UserLayout */}
        <Route element={<ProtectedRoute element={<UserLayout />} />}>
          <Route path={ROUTES.USER.ROOT}>
            <Route
              index
              element={<Navigate to={ROUTES.USER.PROFILE} replace />}
            />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="email" element={<UserEmailPage />} />
            <Route path="security" element={<UserSecurityPage />} />
          </Route>
        </Route>
      </Routes>

      {/* Modal routes - rendered on top when background is present */}
      {background && (
        <Routes>
          <Route
            path={ROUTES.CARD_PATTERN}
            element={
              <ProtectedRoute element={
                <ModalPortal>
                  <CardPage />
                </ModalPortal>
              }/>
            }
          />
        </Routes>
      )}
    </Suspense>
  );
};

export default App;
