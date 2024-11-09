import { useState } from 'react';
import { TimeRound } from '@rsuite/icons';
import { Modal, SelectPicker, Button, DateRangePicker, Input } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import dayjs from 'dayjs';
import { Booking, useBooking } from '../contexts/BookingContext';

type BookingModalProps = {
  open: boolean;
  date: Date | null;
  booking?: Booking | null;
  handleClose: () => void;
};

export function BookingModal({
  open,
  date,
  booking,
  handleClose
}: Readonly<BookingModalProps>) {
  const { createBooking, updateBooking } = useBooking();

  const selectData = ['Sala1', 'Sala2', 'Sala3'].map(room => ({
    label: room,
    value: room
  }));

  const [title, setTitle] = useState<string>(() => booking?.title ?? '');

  const [room, setRoom] = useState<string | null>(
    () => booking?.roomId ?? null
  );

  const [time, setTime] = useState<DateRange | null>(() => {
    if (booking) {
      return [booking.start, booking.end];
    }

    return null;
  });

  function handleSubmit() {
    const startDate = dayjs(date)
      .set('hour', time![0].getHours())
      .set('minute', time![0].getMinutes());

    const endDate = dayjs(date)
      .set('hour', time![1].getHours())
      .set('minute', time![1].getMinutes());

    const newBooking = {
      title,
      roomId: room!,
      start: startDate.toDate(),
      end: endDate.toDate()
    };

    if (booking) updateBooking(booking, newBooking);
    else createBooking(newBooking);

    setTitle('');
    setRoom(null);
    setTime(null);
    handleClose();
  }

  const titleText = booking ? 'Editar agendamento' : 'Agendar um horário';
  const buttonText = booking ? 'Editar' : 'Agendar';

  return (
    <Modal open={open} onClose={handleClose} size="lg">
      <Modal.Header>
        <Modal.Title>{titleText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-4 h-96">
          Título
          <Input value={title} onChange={setTitle} />
          Sala
          <SelectPicker value={room} data={selectData} onChange={setRoom} />
          Horário
          <DateRangePicker
            value={time}
            format="HH:mm"
            caretAs={TimeRound}
            ranges={[]}
            onChange={setTime}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          appearance="primary"
          onClick={handleSubmit}
          disabled={!room || !date || !time || time[0] >= time[1]}
        >
          {buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
