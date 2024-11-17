import { useState } from 'react';
import {
  Table as RSTable,
  Pagination,
  IconButton,
  Button,
  Input
} from 'rsuite';
import { Edit, Trash, Save } from '@rsuite/icons';
import { useRoom } from '../contexts/RoomContext';

type TableRoom = {
  id: number;
  name: string;
  status: string | null;
};

export function RoomTable() {
  const { rooms, createRoom, updateRoom, deleteRoom } = useRoom();

  const [tableRooms, setTableRooms] = useState<TableRoom[]>(() => {
    return rooms.map(room => ({ ...room, status: null }));
  });

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = tableRooms.filter((_, i) => {
    const start = limit * (page - 1);
    const end = start + limit;

    return i >= start && i < end;
  });

  function handleChange(id: number, name: string) {
    const newRoom = tableRooms.map(room => {
      if (room.id == id) return { id, name, status: room.status };
      return room;
    });

    setTableRooms(newRoom);
  }

  async function handleEdit(id: number) {
    const newRooms = await Promise.all(
      tableRooms.map(async room => {
        if (room.id == id) {
          if (room.status) {
            await updateRoom(id, room.name);
          }

          return { ...room, status: room.status ? null : 'EDIT' };
        }

        return room;
      })
    );

    setTableRooms(newRooms);
  }

  async function handleRemove(id: number) {
    setTableRooms(tableRooms.filter(room => room.id !== id));
    await deleteRoom(id);
  }

  async function handleAdd() {
    const room = await createRoom('');
    const newRoom = { id: room.id, name: '', status: 'EDIT' };

    setTableRooms([...tableRooms, newRoom]);
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
          total={rooms.length}
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
          autoFocus
        />
      ) : (
        name
      )}
    </>
  );
}
