/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import GaugeChart from 'react-gauge-chart';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function GuageChartRange({ score, index, id, status }) {
  const chartStyle = {
    width: '90%',
    color: 'red',
    fontSize: '20px',
    justifyContent: 'center',
  };

  return (
    <>
      <Row>
        <GaugeChart
          id={`gauge-chart-${id}-${index + 1}`}
          nrOfLevels={3}
          animate={true}
          style={chartStyle}
          colors={['#ccffd6', '#feffb3', '#ffb3b3']}
          arcWidth={0.1}
          textColor={'#464A4F'}
          percent={score && score.fixed ? score.fixed : score}
          hideText={true}
        />
      </Row>
      {
        <Row className='justify-content-center'>
          {score && score.origin
            ? `${status}(${score.origin})`
            : score === 0
            ? score
            : Number(score).toPrecision(1)}
        </Row>
      }
    </>
  );
}
