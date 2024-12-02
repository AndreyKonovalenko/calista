import { createBrowserRouter } from 'react-router-dom';

import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';

const router = createBrowserRouter([MainRoutes, AuthRoutes]);

export default router;
