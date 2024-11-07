import { useState } from 'react';
import { TimeRound } from '@rsuite/icons';
import { Modal, SelectPicker, Button, DateRangePicker, Input } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import dayjs from 'dayjs';

export type Booking = {
  start: Date;
  end: Date;
  title: string;
  roomId: string;
};

type BookRoomProps = {
  open: boolean;
  date: Date | null;
  handleClose: () => void;
  handleBook: (booking: Booking) => void;
};

export function BookRoom({
  open,
  date,
  handleClose,
  handleBook
}: Readonly<BookRoomProps>) {
  const selectData = ['Sala1', 'Sala2', 'Sala3'].map(room => ({
    label: room,
    value: room
  }));

  const [title, setTitle] = useState<string>('');
  const [room, setRoom] = useState<string | null>('');
  const [time, setTime] = useState<DateRange | null>(null);

  function handleSubmit() {
    const startDate = dayjs(date)
      .set('hour', time![0].getHours())
      .set('minute', time![0].getMinutes());

    const endDate = dayjs(date)
      .set('hour', time![1].getHours())
      .set('minute', time![1].getMinutes());

    handleBook({
      title,
      roomId: room!,
      start: startDate.toDate(),
      end: endDate.toDate()
    });

    setTitle('');
    setRoom(null);
    setTime(null);
  }

  return (
    <Modal open={open} onClose={handleClose} size="lg">
      <Modal.Header>
        <Modal.Title>Agendar um horário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-4 h-96">
          Título
          <Input value={title} onChange={setTitle} />
          Sala
          <SelectPicker data={selectData} onChange={setRoom} />
          Horário
          <DateRangePicker
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
          Agendar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
