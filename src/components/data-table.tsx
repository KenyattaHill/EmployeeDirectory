import React from 'react';
import { Table } from 'semantic-ui-react';
import TableHeader from './table-header';
import TableBody from './table-body';
import { useEmployees } from '../hooks/use-employee';
import { Header } from '../types';

export default function DataTable() {
  const { state } = useEmployees();
  const { filteredEmployees } = state;

  const headers: Header[] = [
    { display: '', name: 'picture' },
    { display: 'First Name', name: 'first' },
    { display: 'Last Name', name: 'last' },
    { display: 'Email', name: 'email' },
    { display: 'Phone', name: 'phone' },
    { display: 'Location', name: 'location' },
  ];
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
