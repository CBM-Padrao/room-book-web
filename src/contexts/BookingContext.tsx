import { useContext, createContext, useState, useMemo } from 'react';

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
  addBooking: (booking: Booking) => void;
};

const BookingContext = createContext({} as BookingContextData);

// eslint-disable-next-line react-refresh/only-export-components
export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }: Readonly<BookingProviderProps>) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const value: BookingContextData = useMemo(() => {
    return {
      bookings,
      addBooking: (booking: Booking) => {
        setBookings([...bookings, booking]);
      }
    };
  }, [bookings]);
  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}
