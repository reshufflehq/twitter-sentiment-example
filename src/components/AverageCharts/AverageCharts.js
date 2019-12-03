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
            {totals && `User average toxicity level: `}
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
            {totals && `User average toxicity level: `}
          </Col>
          <Col className='col-2'>
            {totals && <GuageChartRange score={0.5} index={2} id={'avg1'} />}
          </Col>
        </>
        <>
          <Col className='level-text text-right pt-1'>
            {totals && `User average:`}
          </Col>
          <Col className='col-2'>
            {totals && <GuageChartRange score={0.5} index={3} id={'avg2'} />}
          </Col>
        </>
      </Row>
    </Container>
  );
}
