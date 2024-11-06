import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CustomProvider } from 'rsuite';

import './index.css';
import 'rsuite/dist/rsuite-no-reset.min.css';

import { Login } from './pages/login.tsx';
import { Home } from './pages/home.tsx';
import { locale } from './lib/rsuite.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomProvider theme="dark" locale={locale}>
      <RouterProvider router={router} />
    </CustomProvider>
  </StrictMode>
);
