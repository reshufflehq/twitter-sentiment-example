/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GuageChartRange from '../GuageChartRange/GuageChartRange';

import { Progress } from 'react-sweet-progress';
import './AverageCharts.css';

export default function AverageCharts({ totals }) {
  return (
    <Container>
      <Row className='p-5'>
        <>
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
        </>
        <>
          <Col className='level-text text-right pt-1'>
            {totals && `Average node sentiment analysis: `}
          </Col>
          <Col className='col-2'>
            {totals && <GuageChartRange score={totals.sentiment} index={2} id={'avg1'} />}
          </Col>
        </>
        <>
          <Col className='level-text text-right pt-1'>
            {totals && `Average Google sentiment analysis:`}
          </Col>
          <Col className='col-2'>
            {totals && <GuageChartRange score={totals.google_sentiment} index={3} id={'avg2'} />}
          </Col>
        </>
      </Row>
    </Container>
  );
}
