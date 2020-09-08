import React from 'react';
import { Table, Image } from 'semantic-ui-react';

export default function TableBody({ data }) {
  const rows = data.map(
    ({ first, last, email, phone, location, picture }, i) => (
      <Table.Row key={i}>
        <Table.Cell>
          <Image size='small' src={picture} avatar />
        </Table.Cell>
        <Table.Cell>{first}</Table.Cell>
        <Table.Cell>{last}</Table.Cell>
        <Table.Cell>{email}</Table.Cell>
        <Table.Cell>{phone}</Table.Cell>
        <Table.Cell>{location}</Table.Cell>
      </Table.Row>
    )
  );
  return <Table.Body>{rows}</Table.Body>;
}
