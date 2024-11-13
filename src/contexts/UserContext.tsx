import {
  useContext,
  createContext,
  useState,
  useMemo,
  useCallback
} from 'react';

export type User = {
  register: string;
  name: string;
  email: string;
  isAdmin?: boolean;
};

type UserProviderProps = {
  children: React.ReactNode;
};

type UserContextData = {
  users: User[];
  createUser: (user: User) => void;
  deleteUser: (user: User) => void;
  updateUser: (oldUser: User, newUser: User) => void;
};

const UserContext = createContext({} as UserContextData);

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: Readonly<UserProviderProps>) {
  const [users, setUsers] = useState<User[]>([]);

  const createUser = useCallback(
    (user: User) => {
      setUsers([...users, user]);
    },
    [users]
  );

  const updateUser = useCallback(
    (oldUser: User, newUser: User) => {
      const newUsers = users.map(u => {
        if (u.register === oldUser.register) {
          return newUser;
        }

        return u;
      });

      setUsers(newUsers);
    },
    [users]
  );

  const deleteUser = useCallback(
    (user: User) => {
      const newUsers = users.filter(u => {
        if (u.register !== user.register) {
          return u;
        }
      });

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
