import {
  useContext,
  createContext,
  useState,
  useMemo,
  useCallback
} from 'react';

export type Booking = {
  start: Date;
  end: Date;
  title: string;
  roomId: string;
};

type BookingProviderProps = {
  children: React.ReactNode;
};

type BookingContextData = {
  bookings: Booking[];
  createBooking: (booking: Booking) => void;
  deleteBooking: (booking: Booking) => void;
  updateBooking: (oldBooking: Booking, newBooking: Booking) => void;
};

const BookingContext = createContext({} as BookingContextData);

// eslint-disable-next-line react-refresh/only-export-components
export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }: Readonly<BookingProviderProps>) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const createBooking = useCallback(
    (booking: Booking) => {
      setBookings([...bookings, booking]);
    },
    [bookings]
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
