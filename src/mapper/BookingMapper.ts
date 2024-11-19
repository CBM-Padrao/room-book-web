import dayjs from 'dayjs';
import { User } from '../contexts/AuthContext';
import { Booking, BookingResponse } from '../contexts/BookingContext';

export class BookingMapper {
  static mapBookingResponseToBooking(bookingResponse: BookingResponse) {
    return {
      id: bookingResponse.id,
      start: dayjs(bookingResponse.startTime).subtract(3, 'hour').toDate(),
      end: dayjs(bookingResponse.endTime).subtract(3, 'hour').toDate(),
      title: bookingResponse.title,
      roomId: bookingResponse.room.id,
      room: bookingResponse.room.name,
      userId: bookingResponse.user.id,
      participants: bookingResponse.participants.map(p => p.id)
    };
  }

  static mapBookingToBookingRequest(booking: Booking, user: User) {
    return {
      title: booking.title,
      roomId: booking.roomId,
      userId: user.id,
      participantIds: booking.participants,
      startTime: booking.start.toISOString(),
      endTime: booking.end.toISOString()
    };
  }
}
