/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GuageChartRangeNode from '../GuageChartRange/GuageChartRangeNode';
import GuageChartRangeGoogle from '../GuageChartRange/GuageChartRangeGoogle';

import { Progress } from 'react-sweet-progress';
import './AverageCharts.css';

export default function AverageCharts({ totals }) {
  const nodeSentimentScore = totals && totals.sentiment;
  const googleSentimentScore = totals && totals.google_sentiment;

  return (
    <Container>
      <Row className='p-5'>
        <Col className='level-text text-right pt-1'>
          {totals && `Average Google sentiment:`}
        </Col>
        <Col className='col-2'>
          {totals && (
            <GuageChartRangeGoogle score={googleSentimentScore} index={10} />
          )}
        </Col>
        <Col className='level-text text-right pt-1'>
          {totals && `Average node sentiment: `}
        </Col>
        <Col className='col-2'>
          {totals && (
            <GuageChartRangeNode score={nodeSentimentScore} index={20} />
          )}
        </Col>
        <Col className='level-text text-right pt-1'>
          {totals && `Average toxicity level: `}
        </Col>
        <Col className='col-2'>
          {totals && (
            <Progress
              type='circle'
              strokeWidth={5}
              percent={totals.tox}
              width={100}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}
