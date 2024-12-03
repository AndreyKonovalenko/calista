import React from 'react';
import AuthLayout from '../layout/AuthLayout';
import { TO_LOGIN, TO_REGISTER } from '../utils/route-constants';
import RegisterPage from '../pages/register-page/register-page';
import LoginPage from '../pages/login-page/login-page';

const AuthRoutes = {
  path: '/',
  element: <AuthLayout />,
  children: [
    {
      path: TO_LOGIN,
      element: <LoginPage />,
    },
    {
      path: TO_REGISTER,
      element: <RegisterPage />,
    },
  ],
};

export default AuthRoutes;
