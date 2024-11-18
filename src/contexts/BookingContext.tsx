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
import { BookingMapper } from '../mapper/BookingMapper';

export type Booking = {
  id?: number;
  start: Date;
  end: Date;
  title: string;
  roomId: number;
  room?: string;
  participants: number[];
};

export type BookingResponse = {
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
  deleteBooking: (booking: Booking) => Promise<void>;
  updateBooking: (oldBooking: Booking, newBooking: Booking) => Promise<void>;
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
      if (!user) {
        return;
      }

      const { data } = await api.post<BookingResponse[]>('/bookings', {
        userId: user.id
      });

      const bookings = data.map(BookingMapper.mapBookingResponseToBooking);

      setBookings(bookings);
    }

    loadBookings();
  }, [user]);

  const createBooking = useCallback(
    async (booking: Booking) => {
      const bookingRequest = BookingMapper.mapBookingToBookingRequest(
        booking,
        user!
      );

      const { data } = await api.post<BookingResponse>(
        '/bookings/create',
        bookingRequest
      );

      booking = BookingMapper.mapBookingResponseToBooking(data);

      setBookings([...bookings, booking]);
    },
    [bookings, user]
  );

  const updateBooking = useCallback(
    async (oldBooking: Booking, newBooking: Booking) => {
      const newBookings = bookings.filter(b => {
        if (b.id !== oldBooking.id) {
          return b;
        }
      });

      const { data } = await api.put('/bookings/update', {
        id: oldBooking.id,
        ...newBooking,
        participantIds: newBooking.participants,
        startTime: newBooking.start.toISOString(),
        endTime: newBooking.end.toISOString()
      });

      const booking = BookingMapper.mapBookingResponseToBooking(data);

      setBookings([...newBookings, booking]);
    },
    [bookings]
  );

  const deleteBooking = useCallback(
    async (booking: Booking) => {
      const newBookings = bookings.filter(b => {
        if (b.id !== booking.id) {
          return b;
        }
      });

      await api.delete(`/bookings/delete/${booking.id}`);

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
