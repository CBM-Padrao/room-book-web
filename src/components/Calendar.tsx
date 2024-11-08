import dayjs from 'dayjs';
import { useState } from 'react';
import { Calendar as RSCalendar, Badge, HStack } from 'rsuite';
import { BookingModal } from './BookingModal';
import { Bookings } from './Bookings';
import { Booking, useBooking } from '../contexts/BookingContext';

function getBookingsOfTheDay(bookings: Booking[], date: Date | null) {
  return bookings.filter(b => {
    return dayjs(b.start).isSame(date, 'day');
  });
}

export function Calendar() {
  const { bookings } = useBooking();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(dayjs().toDate());
  const [date, setDate] = useState<Date | null>(null);

  function handleSelect(date: Date) {
    if (dayjs(date).isBefore(dayjs(), 'day')) return;

    const bookingsOfTheDay = getBookingsOfTheDay(bookings, date);
    setDate(date);

    if (bookingsOfTheDay.length === 0) handleOpen();
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function renderCell(cellDate: Date) {
    const bookingsOfTheDay = getBookingsOfTheDay(bookings, cellDate);

    if (bookingsOfTheDay.length > 0) {
      return <Badge color="cyan" />;
    }

    return null;
  }

  return (
    <>
      <HStack className="m-auto" alignItems="flex-start">
        <RSCalendar
          bordered
          value={value}
          className="w-[784px] text-zinc-400"
          onSelect={handleSelect}
          onChange={setValue}
          renderCell={renderCell}
          cellClassName={date =>
            'border-2 border-zinc-800 ' +
            (!dayjs(date).isSame(value, 'month') ||
            dayjs(date).isBefore(dayjs(), 'day')
              ? 'bg-zinc-800'
              : 'text-zinc-400')
          }
        />
        <Bookings
          bookings={getBookingsOfTheDay(bookings, date)}
          handleOpen={handleOpen}
        />
      </HStack>
      <BookingModal open={open} handleClose={handleClose} date={date} />
    </>
  );
}
