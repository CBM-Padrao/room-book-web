import { Button, List, Text } from 'rsuite';
import type { Booking } from './BookRoom';
import dayjs from 'dayjs';

type BookingsProps = {
  bookings: Booking[];
  handleOpen: () => void;
};

export function Bookings({ bookings, handleOpen }: Readonly<BookingsProps>) {
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col justify-center bg-[#0f131a] w-96 self-stretch rounded-[6px] border-[#292d33] border-[1px]">
        <Text className="text-center !text-zinc-400 p-4 text-sm">
          Selecione um dia no calendário para ver e criar agendamentos
        </Text>
      </div>
    );
  }

  return (
    <List className="w-96 self-stretch" bordered>
      <div className="flex justify-between items-center m-3">
        <span className="text-md text-slate-200">Agendamentos</span>

        <Button appearance="primary" onClick={handleOpen}>
          <span>Agendar horário</span>
        </Button>
      </div>

      {bookings.map(booking => (
        <List.Item key={booking.start.getHours()}>
          <div>
            {booking.roomId} — {booking.title}
          </div>
          <div>
            {dayjs(booking.start).format('HH:mm')},{' '}
            {dayjs(booking.end).format('HH:mm')}
          </div>
        </List.Item>
      ))}
    </List>
  );
}
