import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CustomProvider } from 'rsuite';

import './index.css';
import 'rsuite/dist/rsuite-no-reset.min.css';

import { Login } from './pages/login';
import { Home } from './pages/home';
import { Admin } from './pages/admin';
import { AdminLogin } from './pages/admin/login';

import { BookingProvider } from './contexts/BookingContext.tsx';
import { locale } from './lib/rsuite.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/admin',
    element: <Admin />
  },
  {
    path: '/admin/login',
    element: <AdminLogin />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomProvider theme="dark" locale={locale}>
      <BookingProvider>
        <RouterProvider router={router} />
      </BookingProvider>
    </CustomProvider>
  </StrictMode>
);
