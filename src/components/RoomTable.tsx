import { useState } from 'react';
import {
  Table as RSTable,
  Pagination,
  IconButton,
  Button,
  Input
} from 'rsuite';
import { Edit, Trash, Save } from '@rsuite/icons';

const defaultData = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  name: `Sala ${i + 1}`,
  status: ''
}));

export function RoomTable() {
  const [rooms, setRooms] = useState(defaultData);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = rooms.filter((_, i) => {
    const start = limit * (page - 1);
    const end = start + limit;

    return i >= start && i < end;
  });

  function handleChange(id: number, name: string) {
    const newRoom = rooms.map(room => {
      if (room.id == id) return { id, name, status: room.status };

      return room;
    });

    setRooms(newRoom);
  }

  function handleEdit(id: number) {
    const newRooms = rooms.map(room => {
      if (room.id == id)
        return { ...room, status: room.status == '' ? 'EDIT' : '' };

      return room;
    });

    setRooms(newRooms);
  }

  function handleRemove(id: number) {
    setRooms(rooms.filter(room => room.id !== id));
  }

  function handleAdd() {
    const newRoom = { id: rooms.length, name: '', status: 'EDIT' };

    setRooms([...rooms, newRoom]);
  }

  return (
    <div className="m-auto">
      <Button
        onClick={handleAdd}
        style={{ padding: '5px 15px' }}
        className="!mb-4"
      >
        Adicionar sala
      </Button>

      <div className="border-b-[1px] border-[#292d33]"></div>

      <RSTable
        width={1024}
        height={600}
        headerHeight={45}
        rowHeight={60}
        data={data}
        bordered
        className="bg-[#121416] rounded-md mt-6"
      >
        <RSTable.Column width={100} flexGrow={1} fixed verticalAlign="center">
          <RSTable.HeaderCell>Nome</RSTable.HeaderCell>
          <RSTable.Cell dataKey="name">
            {rowData => (
              <EditableCell
                id={rowData.id}
                name={rowData.name}
                status={rowData.status}
                handleChange={handleChange}
              />
            )}
          </RSTable.Cell>
        </RSTable.Column>

        <RSTable.Column width={200}>
          <RSTable.HeaderCell>Ações</RSTable.HeaderCell>
          <RSTable.Cell style={{ display: 'flex', padding: 6, gap: 4 }}>
            {rowData => (
              <>
                <IconButton
                  appearance="subtle"
                  color="blue"
                  icon={rowData.status == 'EDIT' ? <Save /> : <Edit />}
                  onClick={() => handleEdit(rowData.id)}
                />
                <IconButton
                  appearance="subtle"
                  color="red"
                  icon={<Trash />}
                  onClick={() => handleRemove(rowData.id)}
                />
              </>
            )}
          </RSTable.Cell>
        </RSTable.Column>
      </RSTable>
      <div className="py-10">
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={['total', '-', 'limit', '|', 'pager', 'skip']}
          total={defaultData.length}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
    </div>
  );
}

type EditableCellProps = {
  id: number;
  name: string;
  status: string;
  handleChange: (id: number, name: string) => void;
};

function EditableCell({
  id,
  name,
  status,
  handleChange
}: Readonly<EditableCellProps>) {
  const isEditing = status === 'EDIT';

  return (
    <>
      {isEditing ? (
        <Input
          defaultValue={name}
          onChange={value => handleChange(id, value)}
        />
      ) : (
        name
      )}
    </>
  );
}
