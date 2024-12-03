import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserStore } from './services/user/user-store';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  useUserStore();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

// <Routes>
// <Route path='/' element={<Layout />}>
//   <Route index element={<ProtectedRoute element={<MainPage />} />} />
//   <Route path={TO_LOGIN} element={<LoginPage />} />
//   <Route path={TO_REGISTER} element={<RegisterPage />} />
//   {/* <Route path={`${TO_BOARDS}/:id`} element={<BoardPage/>}/> */}
//   <Route
//     path={`${TO_BOARDS}/:name`}
//     element={<ProtectedRoute element={<BoardPage />} />}
//   />
// </Route>
// </Routes>
