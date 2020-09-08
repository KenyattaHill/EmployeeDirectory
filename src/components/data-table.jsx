import React from 'react';
import { Table } from 'semantic-ui-react';
import TableHeader from './table-header';
import TableBody from './table-body';
import { useEmployees } from '../use-employee';

export default function DataTable({ headers }) {
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
