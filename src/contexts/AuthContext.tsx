import {
  useContext,
  useEffect,
  useState,
  createContext,
  useMemo,
  useCallback
} from 'react';

import { api } from '../lib/axios';
import { useLocalStorage } from '../hooks/useLocalStorage';

type AuthProviderProps = {
  children: React.ReactNode;
};

type User = {
  id: number;
  name: string;
  email: string;
  registration: string;
  role: string;
  createdAt: Date | null;
  updatedAt: Date | null;
};

type AuthResponse = {
  token: string;
  user: User;
};

type AuthContextData = {
  user: User | null;
  signOut: () => void;
  logIn: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext({} as AuthContextData);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useLocalStorage<string | null>(
    '@room-book:token',
    null
  );
  const [userId, setUserId] = useLocalStorage<number | null>(
    '@room-book:user_id',
    null
  );

  useEffect(() => {
    async function setUserIfToken() {
      if (token && userId) {
        api.defaults.headers.common.authorization = `Bearer ${token}`;

        const response = await api.get<User>(`/users/${userId}`);

        setUser(response.data);
      }
    }

    setUserIfToken();
  }, [token, user, userId]);

  const logIn = useCallback(
    async (registration: string, password: string) => {
      try {
        const response = await api.post<AuthResponse>('/auth/login', {
          registration,
          password
        });

        const { token, user } = response.data;

        setUser(user);
        setToken(token);
        setUserId(user.id);

        api.defaults.headers.common.authorization = `Bearer ${token}`;
      } catch (error) {
        console.error(error);
      }
    },
    [setToken, setUserId]
  );

  function signOut() {
    setUser(null);
    localStorage.removeItem('@room-book:token');
    localStorage.removeItem('@room-book:user_id');
  }

  const value: AuthContextData = useMemo(() => {
    return {
      user,
      logIn,
      signOut
    };
  }, [logIn, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
