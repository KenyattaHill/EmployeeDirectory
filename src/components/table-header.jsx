import React from 'react';
import { Table } from 'semantic-ui-react';
import { useEmployees } from '../use-employee';

export default function TableHeader({ headers }) {
  const { state, dispatch, actions } = useEmployees();
  const { column, direction } = state;

  const mappedHeaders = headers.map(({ display, name }, i) => (
    <Table.HeaderCell
      key={i}
      sorted={column === name ? direction : null}
      onClick={() => dispatch({ type: actions.CHANGE_SORT, column: name })}>
      {display}
    </Table.HeaderCell>
  ));
  return (
    <Table.Header>
      <Table.Row>{mappedHeaders}</Table.Row>
    </Table.Header>
  );
}
