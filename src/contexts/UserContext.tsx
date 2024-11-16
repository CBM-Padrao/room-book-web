import {
  useContext,
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect
} from 'react';
import { api } from '../lib/axios';
import { useAuth } from './AuthContext';

export type User = {
  id?: number;
  name: string;
  email: string;
  registration: string;
  password: string;
  role: string;
};

type UserProviderProps = {
  children: React.ReactNode;
};

type UserContextData = {
  users: User[];
  createUser: (user: User) => Promise<void>;
  deleteUser: (user: User) => Promise<void>;
  updateUser: (oldUser: User, newUser: User) => Promise<void>;
};

const UserContext = createContext({} as UserContextData);

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: Readonly<UserProviderProps>) {
  const { user } = useAuth();

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/users');
      setUsers(response.data);
    }

    loadUsers();
  }, [user]);

  const createUser = useCallback(
    async (user: User) => {
      const response = await api.post('/users/create', user);

      setUsers([...users, response.data]);
    },
    [users]
  );

  const updateUser = useCallback(
    async (oldUser: User, newUser: User) => {
      const newUsers = users.filter(u => {
        if (u.registration !== oldUser.registration) {
          return u;
        }
      });

      const response = await api.put('/users/update', {
        id: oldUser.id,
        ...newUser
      });

      setUsers([...newUsers, response.data]);
    },
    [users]
  );

  const deleteUser = useCallback(
    async (user: User) => {
      const newUsers = users.filter(u => {
        if (u.registration !== user.registration) {
          return u;
        }
      });

      await api.delete(`/users/delete/${user.id}`);

      setUsers(newUsers);
    },
    [users]
  );

  const value: UserContextData = useMemo(() => {
    return {
      users,
      createUser,
      deleteUser,
      updateUser
    };
  }, [users, createUser, updateUser, deleteUser]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
