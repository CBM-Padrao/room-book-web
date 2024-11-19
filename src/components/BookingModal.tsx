import { useState } from 'react';
import { TimeRound } from '@rsuite/icons';
import {
  Modal,
  SelectPicker,
  Button,
  DateRangePicker,
  Input,
  TagPicker,
  Notification,
  useToaster
} from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import dayjs from 'dayjs';
import { Booking, useBooking } from '../contexts/BookingContext';
import { useRoom } from '../contexts/RoomContext';
import { useUser } from '../contexts/UserContext';

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
  const { rooms } = useRoom();
  const { users } = useUser();
  const toaster = useToaster();

  const selectData = rooms.map(room => ({
    label: room.name,
    value: room.id
  }));

  const tagData = users.map(user => {
    return { label: user.name, value: user.id };
  });

  const [title, setTitle] = useState<string>(() => booking?.title ?? '');

  const [room, setRoom] = useState<number | null>(
    () => booking?.roomId ?? null
  );

  const [time, setTime] = useState<DateRange | null>(() => {
    if (booking) {
      return [booking.start, booking.end];
    }

    return null;
  });

  const [participants, setParticipants] = useState<number[]>(() => {
    if (booking) {
      return booking.participants;
    }

    return [];
  });

  async function handleSubmit() {
    const startDate = dayjs(date)
      .set('hour', time![0].getHours())
      .set('minute', time![0].getMinutes());

    const endDate = dayjs(date)
      .set('hour', time![1].getHours())
      .set('minute', time![1].getMinutes());

    const newBooking = {
      title,
      roomId: room!,
      participants,
      start: startDate.toDate(),
      end: endDate.toDate()
    };

    try {
      if (booking) await updateBooking(booking, newBooking);
      else await createBooking(newBooking);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toaster.push(
        <Notification type="error" header="Operação falhou" closable>
          {error.response?.data.message ||
            'Houve um erro ao criar uma sala. Tente novamente.'}
        </Notification>,
        { placement: 'topEnd', duration: 5000 }
      );
    }

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
          Participantes
          <TagPicker
            data={tagData}
            value={participants}
            onChange={setParticipants}
          />
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
