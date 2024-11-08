import { useState } from 'react';
import { Table as RSTable, Pagination, IconButton, Button } from 'rsuite';
import { Edit, Trash } from '@rsuite/icons';
import { mockUsers } from '../tests/mock';

const defaultData = mockUsers(100);

export function Table() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = defaultData.filter((_, i) => {
    const start = limit * (page - 1);
    const end = start + limit;

    return i >= start && i < end;
  });

  return (
    <div className="m-auto">
      <Button
        style={{ padding: '5px 15px' }}
        // className="!absolute top-2 right-2 z-10"
        className="!mb-4"
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
          <RSTable.Cell dataKey="id" />
        </RSTable.Column>

        <RSTable.Column width={200}>
          <RSTable.HeaderCell>Nome</RSTable.HeaderCell>
          <RSTable.Cell dataKey="name" />
        </RSTable.Column>

        <RSTable.Column width={200} flexGrow={1}>
          <RSTable.HeaderCell>Email</RSTable.HeaderCell>
          <RSTable.Cell dataKey="email" />
        </RSTable.Column>

        <RSTable.Column width={200} flexGrow={1}>
          <RSTable.HeaderCell>Ações</RSTable.HeaderCell>
          <RSTable.Cell style={{ display: 'flex', padding: 6, gap: 4 }}>
            <IconButton
              appearance="subtle"
              color="blue"
              icon={<Edit />}
              onClick={() => {}}
            />
            <IconButton
              appearance="subtle"
              color="red"
              icon={<Trash />}
              onClick={() => {}}
            />
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
