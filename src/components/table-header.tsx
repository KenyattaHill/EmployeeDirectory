import React from 'react';
import { Table } from 'semantic-ui-react';
import { useEmployees } from '../hooks/use-employee';
import { Actions, Header } from '../types';

type Props = {
  headers: Header[];
};
export default function TableHeader({ headers }: Props) {
  const { state, dispatch } = useEmployees();
  const { column, direction } = state;

  const mappedHeaders = headers.map(({ display, name }: Header, i) => (
    <Table.HeaderCell
      key={i}
      sorted={column === name ? direction : undefined}
      onClick={() => dispatch({ type: Actions.CHANGE_SORT, column: name })}>
      {display}
    </Table.HeaderCell>
  ));
  return (
    <Table.Header>
      <Table.Row>{mappedHeaders}</Table.Row>
    </Table.Header>
  );
}
