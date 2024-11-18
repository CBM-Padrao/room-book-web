import { useState } from 'react';
import { Table as RSTable, Pagination, IconButton, Button } from 'rsuite';
import { Edit, Trash } from '@rsuite/icons';
import { UserModal } from './UserModal';
import { useUser } from '../contexts/UserContext';

import type { User } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';

export function UserTable() {
  const { user: currentUser } = useAuth();
  const { users, deleteUser } = useUser();

  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = users.filter((_, i) => {
    const start = limit * (page - 1);
    const end = start + limit;

    return i >= start && i < end;
  });

  function handleClose() {
    setOpen(false);
    setUser(null);
  }

  return (
    <div className="m-auto">
      {open && <UserModal open={open} handleClose={handleClose} user={user} />}

      <Button
        style={{ padding: '5px 15px' }}
        className="!mb-4"
        onClick={() => setOpen(true)}
      >
        Adicionar membro
      </Button>

      <div className="border-b-[1px] border-[#292d33]"></div>

      <RSTable
        width={1024}
        height={600}
        headerHeight={45}
        data={data}
        bordered
        className="bg-[#121416] rounded-md mt-6"
      >
        <RSTable.Column width={100} align="center" fixed>
          <RSTable.HeaderCell>Matrícula</RSTable.HeaderCell>
          <RSTable.Cell dataKey="registration" />
        </RSTable.Column>

        <RSTable.Column width={200}>
          <RSTable.HeaderCell>Nome</RSTable.HeaderCell>
          <RSTable.Cell dataKey="name" />
        </RSTable.Column>

        <RSTable.Column width={200} flexGrow={1}>
          <RSTable.HeaderCell>Email</RSTable.HeaderCell>
          <RSTable.Cell dataKey="email" />
        </RSTable.Column>

        <RSTable.Column width={200}>
          <RSTable.HeaderCell>Cargo</RSTable.HeaderCell>
          <RSTable.Cell
            dataKey="role"
            renderCell={rowData => {
              const colorsByRole = {
                ADMIN: 'bg-green-500',
                GESTOR: 'bg-blue-500',
                MEMBRO: 'bg-yellow-500'
              };

              const bgColor =
                colorsByRole[rowData as keyof typeof colorsByRole];

              const lowerCase = (rowData as string).toLowerCase();
              const role = lowerCase[0].toUpperCase() + lowerCase.slice(1);

              return (
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 ${bgColor}`}></div>
                  <span>{role}</span>
                </div>
              );
            }}
          />
        </RSTable.Column>

        <RSTable.Column width={200} flexGrow={1}>
          <RSTable.HeaderCell>Ações</RSTable.HeaderCell>
          <RSTable.Cell style={{ display: 'flex', padding: 6, gap: 4 }}>
            {rowData => {
              if (currentUser?.role === 'GESTOR' && rowData.role !== 'MEMBRO') {
                return null;
              }

              return (
                <>
                  <IconButton
                    appearance="subtle"
                    color="blue"
                    icon={<Edit />}
                    onClick={() => {
                      setUser(rowData as User);
                      setOpen(true);
                    }}
                  />
                  <IconButton
                    appearance="subtle"
                    color="red"
                    icon={<Trash />}
                    onClick={() => {
                      deleteUser(rowData as User);
                    }}
                  />
                </>
              );
            }}
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
          total={users.length}
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
