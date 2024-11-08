import { useState } from 'react';
import { Button, HStack, List, Text, VStack } from 'rsuite';
import dayjs from 'dayjs';
import { Edit, Trash } from '@rsuite/icons';
import { Booking, useBooking } from '../contexts/BookingContext';
import { BookingModal } from './BookingModal';

type BookingsProps = {
  bookings: Booking[];
  handleOpen: () => void;
};

export function Bookings({ bookings, handleOpen }: Readonly<BookingsProps>) {
  const { deleteBooking } = useBooking();

  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);

  function handleClose() {
    setOpen(false);
  }

  if (bookings.length === 0) {
    return (
      <VStack className="justify-center bg-[#121416] w-96 self-stretch rounded-[6px] border-[#292d33] border-[1px]">
        <Text className="text-center !text-zinc-400 p-4 text-sm">
          Selecione um dia no calendário para ver e criar agendamentos
        </Text>
      </VStack>
    );
  }

  return (
    <>
      {booking && open && (
        <BookingModal
          booking={booking}
          open={open}
          date={booking.start}
          handleClose={handleClose}
        />
      )}

      <List className="w-96 self-stretch" bordered>
        <HStack className="justify-between m-3">
          <span className="text-md text-slate-200">Agendamentos</span>

          <Button appearance="primary" onClick={handleOpen}>
            <span>Agendar horário</span>
          </Button>
        </HStack>

        {bookings.map(booking => (
          <List.Item key={booking.start.getHours()}>
            <HStack className="justify-between">
              <VStack>
                <Text>
                  {booking.roomId} — {booking.title}
                </Text>
                <Text>
                  {dayjs(booking.start).format('HH:mm')},{' '}
                  {dayjs(booking.end).format('HH:mm')}
                </Text>
              </VStack>

              <HStack>
                <Button
                  color="blue"
                  appearance="subtle"
                  size="sm"
                  onClick={() => {
                    setBooking(booking);
                    setOpen(true);
                  }}
                >
                  <Edit />
                </Button>
                <Button
                  color="red"
                  appearance="subtle"
                  size="sm"
                  onClick={() => {
                    deleteBooking(booking);
                  }}
                >
                  <Trash />
                </Button>
              </HStack>
            </HStack>
          </List.Item>
        ))}
      </List>
    </>
  );
}
