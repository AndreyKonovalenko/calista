import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = (): JSX.Element => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
