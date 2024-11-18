import './lib/dayjs.ts';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CustomProvider } from 'rsuite';

import './index.css';
import 'rsuite/dist/rsuite-no-reset.min.css';

import { Login } from './pages/login';
import { Home } from './pages/home';
import { Admin } from './pages/admin';

import { BookingProvider } from './contexts/BookingContext.tsx';
import { RoomProvider } from './contexts/RoomContext.tsx';
import { UserProvider } from './contexts/UserContext.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';

import { locale } from './lib/rsuite.ts';
import { Root } from './layouts/Root.tsx';
import { Rooms } from './pages/rooms.tsx';
import { LoginRoot } from './layouts/LoginRoot.tsx';
import { Account } from './pages/account.tsx';

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
      },
      {
        path: 'rooms',
        element: <Rooms />
      },
      {
        path: 'account',
        element: <Account />
      }
    ]
  },
  {
    element: <LoginRoot />,
    children: [
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomProvider theme="dark" locale={locale}>
      <AuthProvider>
        <UserProvider>
          <RoomProvider>
            <BookingProvider>
              <RouterProvider router={router} />
            </BookingProvider>
          </RoomProvider>
        </UserProvider>
      </AuthProvider>
    </CustomProvider>
  </StrictMode>
);
