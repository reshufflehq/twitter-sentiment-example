/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import './HistoryTable.css';

export default function HistoryTable({ history }) {
  if (!history || history == '') return null;

  const historyTable = [];
  for (let index = 0; index < history.length; index++) {
    let key = history[index].key;
    key = key.substring(7);
    let score = history[index].value.totals.tox;
    let url = `./${key}`;
    historyTable.push(
      <tr key={key}>
        <td>
          <a href={url}>{key}</a>
        </td>
        <td>{score}</td>
      </tr>,
    );
  }

  return (
    <Container className='pt-5 pb-5'>
      <h3 className='history-title'>Recent history of users checked</h3>
      <Table responsive className='w-50'>
        <thead>
          <tr>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>{historyTable}</tbody>
      </Table>
    </Container>
  );
}
