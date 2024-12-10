import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from '../pages/page-not-found/page-not-found';

import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';

const NotFoundRoute = {
  path: '*',
  element:<NotFoundPage />
}

const router = createBrowserRouter([MainRoutes, AuthRoutes, NotFoundRoute]);

export default router;
