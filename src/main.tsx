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
import { UserProvider } from './contexts/UserContext.tsx';
import { locale } from './lib/rsuite.ts';
import { Root } from './layouts/Root.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'admin',
        element: <Admin />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/admin/login',
    element: <AdminLogin />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomProvider theme="dark" locale={locale}>
      <UserProvider>
        <BookingProvider>
          <RouterProvider router={router} />
        </BookingProvider>
      </UserProvider>
    </CustomProvider>
  </StrictMode>
);
