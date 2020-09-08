import React from 'react';
import { Table } from 'semantic-ui-react';
import TableHeader from './table-header';
import TableBody from './table-body';
import { useEmployees } from '../use-employee';
import { Header } from '../types';

type Props = {
  headers: Header[]
}

export default function DataTable({ headers }: Props) {
  const { state } = useEmployees();
  const { filteredEmployees } = state;
  return (
    <>
      {filteredEmployees?.length > 0 ? (
        <Table sortable striped>
          <TableHeader headers={headers} />
          <TableBody data={filteredEmployees} />
        </Table>
      ) : (
        <p>No Data...</p>
      )}
    </>
  );
}
