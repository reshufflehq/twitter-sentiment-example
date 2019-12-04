/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import './HistoryTable.css';
import GaugeChartRangeGoogle from '../GaugeChartRange/GaugeChartRangeGoogle';
import GaugeChartRangeNode from '../GaugeChartRange/GaugeChartRangeNode';
import { Progress } from 'react-sweet-progress';

export default function HistoryTable({ history }) {
  if (!history || history[0] === '') return null;

  const historyTable = [];
  for (let index = 0; index < history.length; index++) {
    let key = history[index].key;
    key = key.substring(7);
    let tox_score = history[index].value.totals.tox;
    let sentiment_score = history[index].value.totals.sentiment;
    let google_score = history[index].value.totals.google_sentiment;
    let url = `${process.env.PUBLIC_URL}/handle/${key}`;
    historyTable.push(
      <tr key={key}>
        <td>
          <a className={`handle-link`} href={url}>
            {key}
          </a>
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
            <GaugeChartRangeGoogle
              width={'50%'}
              score={google_score}
              index={key}
            />
          }
        </td>
        <td>
          {
            <GaugeChartRangeNode
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
      <h3 className='history-title'>Recently Analyzed Handles</h3>
      <Table responsive className='w-50'>
        <thead>
          <tr>
            <th>Handle</th>
            <th>Toxicity</th>
            <th>Google Sentiment</th>
            <th>Node Sentiment</th>
          </tr>
        </thead>
        <tbody>{historyTable}</tbody>
      </Table>
    </Container>
  );
}
