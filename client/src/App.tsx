import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/protected-route/protected-route';
import MainPage from './pages/main-page/main-page';
import BoardPage from './pages/board-page/board-page';
import MainLayout from './layout/MainLayout';
import AuthLayout from './layout/AuthLayout';
import LoginPage from './pages/login-page/login-page';
import RegisterPage from './pages/register-page/register-page';
import NotFoundPage from './pages/page-not-found/page-not-found';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <DndProvider backend={HTML5Backend}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer />
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route
                  index
                  element={<ProtectedRoute element={<MainPage />} />}
                />
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
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </DndProvider>
  );
};

export default App;
