import React from 'react';
import { TO_BOARDS } from '../utils/route-constants';
import MainPage from '../pages/main-page/main-page';
import BoardPage from '../pages/board-page/board-page';
import ProtectedRoute from '../components/protected-route/protected-route';
import MainLayout from '../layout/MainLayout';

const MainRoutes = {
  element: <MainLayout />,
  children: [
    {
      path: TO_BOARDS,
      element: <ProtectedRoute element={<MainPage />}/>,
    },
    {
      path: ':name',
      element: <ProtectedRoute element={<BoardPage />}/>,
    },
  ],
};

export default MainRoutes;

//{/* <Route path={`${TO_BOARDS}/:id`} element={<BoardPage/>}/> */}
