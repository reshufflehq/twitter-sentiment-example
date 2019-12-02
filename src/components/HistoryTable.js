/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import Container from 'react-bootstrap/Container';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export default function HistoryTable(props) {
  console.log(`got:` + JSON.stringify(props.value));
  if (!props.value || props.value == '') return null;

  const historyTable = [];
  for (let index = 0; index < props.value.length; index++) {
    let key = props.value[index].key;
    key = key.substring(7);
    let score = props.value[index].value.totals.tox;
    let url = `./${key}`;
    historyTable.push(
      <Tr>
        <Td>
          <a href={url}>{key}</a>
        </Td>
        <Td>{score}</Td>
      </Tr>,
    );
  }

  return (
    <Container>
      <h3>Recent history of users checked</h3>
      <Table>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Score</Th>
          </Tr>
        </Thead>
        <Tbody>{historyTable}</Tbody>
      </Table>
    </Container>
  );
}
