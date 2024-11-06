import { Modal, SelectPicker, Button, DatePicker, TimePicker } from 'rsuite';

type BookRoomProps = {
  open: boolean;
  handleClose: () => void;
};

export function BookRoom({ open, handleClose }: Readonly<BookRoomProps>) {
  const selectData = ['Sala1', 'Sala2', 'Sala3'].map(room => ({
    label: room,
    value: room
  }));

  return (
    <Modal open={open} onClose={handleClose} size="lg">
      <Modal.Header>
        <Modal.Title>Book a Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-4 h-96">
          Room
          <SelectPicker data={selectData} />
          Date
          <DatePicker format="dd/MM/yyyy" />
          Time
          <TimePicker format="HH:mm" />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button appearance="primary">Book</Button>
      </Modal.Footer>
    </Modal>
  );
}
