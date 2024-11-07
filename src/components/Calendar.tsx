import dayjs from 'dayjs';
import { useState } from 'react';
import { Calendar as RSCalendar } from 'rsuite';
import { BookRoom } from './BookRoom';

export function Calendar() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(dayjs().toDate());

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <RSCalendar
        bordered
        value={value}
        className="w-[784px] text-zinc-400 m-auto"
        onSelect={handleOpen}
        onChange={setValue}
        cellClassName={date =>
          'border-2 border-zinc-800 ' +
          (!dayjs(date).isSame(value, 'month')
            ? 'bg-zinc-800'
            : 'text-zinc-400')
        }
      />
      <BookRoom open={open} handleClose={handleClose} />
    </>
  );
}
