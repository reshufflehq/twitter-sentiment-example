/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import './HistoryTable.css';
import GuageChartRangeGoogle from '../GuageChartRange/GuageChartRangeGoogle';
import GuageChartRangeNode from '../GuageChartRange/GuageChartRangeNode';
import { Progress } from 'react-sweet-progress';

export default function HistoryTable({ history }) {
  if (!history || history == '') return null;

  const historyTable = [];
  for (let index = 0; index < history.length; index++) {
    let key = history[index].key;
    key = key.substring(7);
    let tox_score = history[index].value.totals.tox;
    let sentiment_score = history[index].value.totals.sentiment;
    console.log(`got:` + JSON.stringify(history[index].value.totals));
    let google_score = history[index].value.totals.google_sentiment;
    let url = `${process.env.PUBLIC_URL}/handle/${key}`;
    historyTable.push(
      <tr key={key}>
        <td>
          <a className={`handle-link`} href={url}>{key}</a>
        </td>
        <td>
          {
            <Progress
              type='circle'
              strokeWidth={5}
              percent={tox_score}
              width={50}
            />
          }
        </td>
        <td>
          {
            <GuageChartRangeGoogle
              width={'50%'}
              score={google_score}
              index={key}
            />
          }
        </td>
        <td>
          {
            <GuageChartRangeNode
              width={'50%'}
              score={sentiment_score}
              index={key}
            />
          }
        </td>
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
            <th>toxicity</th>
            <th>Google Sentiment</th>
            <th>Node Sentiment</th>
          </tr>
        </thead>
        <tbody>{historyTable}</tbody>
      </Table>
    </Container>
  );
}
