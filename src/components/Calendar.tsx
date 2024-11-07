import dayjs from 'dayjs';
import { useState } from 'react';
import { Calendar as RSCalendar, Badge, HStack } from 'rsuite';
import { BookRoom } from './BookRoom';
import type { Booking } from './BookRoom';
import { Bookings } from './Bookings';

function getBookingsOfTheDay(bookings: Booking[], date: Date | null) {
  return bookings.filter(b => {
    return dayjs(b.start).isSame(date, 'day');
  });
}

export function Calendar() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(dayjs().toDate());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [date, setDate] = useState<Date | null>(null);

  function handleSelect(date: Date) {
    if (dayjs(date).isBefore(dayjs(), 'day')) return;

    const bookingsOfTheDay = getBookingsOfTheDay(bookings, date);
    setDate(date);

    if (bookingsOfTheDay.length === 0) setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleBook({ title, roomId, start, end }: Booking) {
    setBookings([...bookings, { title, roomId, start, end }]);
    handleClose();
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
      <HStack className="m-auto">
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
        <Bookings bookings={getBookingsOfTheDay(bookings, date)} />
      </HStack>
      <BookRoom
        open={open}
        handleClose={handleClose}
        handleBook={handleBook}
        date={date}
      />
    </>
  );
}
