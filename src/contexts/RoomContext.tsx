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

export type Room = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: Date | null;
};

type RoomProviderProps = {
  children: React.ReactNode;
};

type RoomContextData = {
  rooms: Room[];
  createRoom: (name: string) => Promise<Room>;
  deleteRoom: (id: number) => Promise<void>;
  updateRoom: (id: number, newName: string) => Promise<void>;
};

const RoomContext = createContext({} as RoomContextData);

// eslint-disable-next-line react-refresh/only-export-components
export function useRoom() {
  return useContext(RoomContext);
}

export function RoomProvider({ children }: Readonly<RoomProviderProps>) {
  const { user } = useAuth();

  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    async function loadRooms() {
      const response = await api.get<Room[]>('/rooms');
      setRooms(response.data);
    }

    loadRooms();
  }, [user]);

  const createRoom = useCallback(
    async (name: string) => {
      const response = await api.post<Room>('/rooms/create', {
        name
      });

      const room = response.data;

      setRooms([...rooms, room]);

      return room;
    },
    [rooms]
  );

  const updateRoom = useCallback(
    async (id: number, newName: string) => {
      const newRooms = rooms.map(r => {
        if (r.id === id) {
          return { ...r, name: newName };
        }

        return r;
      });

      setRooms(newRooms);

      await api.put('/rooms/update', {
        id,
        name: newName
      });
    },
    [rooms]
  );

  const deleteRoom = useCallback(
    async (id: number) => {
      const newRooms = rooms.filter(r => r.id !== id);

      setRooms(newRooms);
      await api.delete(`/rooms/delete/${id}`);
    },
    [rooms]
  );

  const value: RoomContextData = useMemo(() => {
    return {
      rooms,
      createRoom,
      deleteRoom,
      updateRoom
    };
  }, [rooms, createRoom, updateRoom, deleteRoom]);
  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
}
