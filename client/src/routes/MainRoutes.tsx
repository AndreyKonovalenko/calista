import React from 'react';
import { TO_BOARDS } from '../utils/route-constants';
import MainPage from '../pages/main-page/main-page';
import BoardPage from '../pages/board-page/board-page';
import ProtectedRoute from '../components/protected-route/protected-route';
import MainLayout from '../layout/MainLayout';

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <ProtectedRoute element={<MainPage />} />,
    },
    {
      path: `${TO_BOARDS}/:name`,
      element: <ProtectedRoute element={<BoardPage />} />,
    },
  ],
};

export default MainRoutes;

//{/* <Route path={`${TO_BOARDS}/:id`} element={<BoardPage/>}/> */}
