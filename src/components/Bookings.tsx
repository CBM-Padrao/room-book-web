import { List } from 'rsuite';
import type { Booking } from './BookRoom';

type BookingsProps = {
  bookings: Booking[];
};

export function Bookings({ bookings }: Readonly<BookingsProps>) {
  if (bookings.length === 0) return null;

  return (
    <List>
      {bookings.map(booking => (
        <List.Item key={booking.start.getHours()}>
          <div>{booking.title}</div>
          <div>{booking.roomId}</div>
          <div>{booking.start.toLocaleString()}</div>
          <div>{booking.end.toLocaleString()}</div>
        </List.Item>
      ))}
    </List>
  );
}
