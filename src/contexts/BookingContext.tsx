import {
  useContext,
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect
} from 'react';

import { useAuth, type User } from './AuthContext';
import type { Room } from './RoomContext';
import { api } from '../lib/axios';
import dayjs from 'dayjs';

export type Booking = {
  id?: number;
  start: Date;
  end: Date;
  title: string;
  roomId: number;
  room: string;
  participants: number[];
};

type BookingResponse = {
  id: number;
  room: Room;
  user: User;
  title: string;
  startTime: string;
  endTime: string;
  participants: User[];
};

type BookingProviderProps = {
  children: React.ReactNode;
};

type BookingContextData = {
  bookings: Booking[];
  createBooking: (booking: Booking) => Promise<void>;
  deleteBooking: (booking: Booking) => void;
  updateBooking: (oldBooking: Booking, newBooking: Booking) => void;
};

const BookingContext = createContext({} as BookingContextData);

// eslint-disable-next-line react-refresh/only-export-components
export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }: Readonly<BookingProviderProps>) {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    async function loadBookings() {
      const { data } = await api.post<BookingResponse[]>('/bookings', {
        userId: user!.id
      });

      const bookings = data.map(b => ({
        id: b.id,
        start: dayjs(b.startTime).toDate(),
        end: dayjs(b.endTime).toDate(),
        title: b.title,
        roomId: b.room.id,
        room: b.room.name,
        participants: b.participants.map(p => p.id)
      }));

      setBookings(bookings);
    }

    loadBookings();
  }, [user]);

  const createBooking = useCallback(
    async (booking: Booking) => {
      const { data } = await api.post<BookingResponse>('/bookings/create', {
        title: booking.title,
        roomId: booking.roomId,
        userId: user!.id,
        participantIds: booking.participants,
        startTime: booking.start.toISOString(),
        endTime: booking.end.toISOString()
      });

      booking = {
        id: data.id,
        start: dayjs(data.startTime).toDate(),
        end: dayjs(data.endTime).toDate(),
        title: data.title,
        roomId: data.room.id,
        room: data.room.name,
        participants: data.participants.map(p => p.id)
      };

      setBookings([...bookings, booking]);
    },
    [bookings, user]
  );

  const updateBooking = useCallback(
    (oldBooking: Booking, newBooking: Booking) => {
      const newBookings = bookings.map(b => {
        if (b.start === oldBooking.start && b.roomId === oldBooking.roomId) {
          return newBooking;
        }

        return b;
      });

      setBookings(newBookings);
    },
    [bookings]
  );

  const deleteBooking = useCallback(
    (booking: Booking) => {
      const newBookings = bookings.filter(b => {
        if (b.start !== booking.start && b.roomId !== booking.roomId) {
          return b;
        }
      });

      setBookings(newBookings);
    },
    [bookings]
  );

  const value: BookingContextData = useMemo(() => {
    return {
      bookings,
      createBooking,
      deleteBooking,
      updateBooking
    };
  }, [bookings, createBooking, updateBooking, deleteBooking]);
  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}
