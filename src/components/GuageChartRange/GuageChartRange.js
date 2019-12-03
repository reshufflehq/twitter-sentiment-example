/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import GaugeChart from 'react-gauge-chart';
import Row from 'react-bootstrap/Row';

export default function GuageChartRange({ score, index, id, status, range, colors }) {
  const chartStyle = {
    width: '90%',
    color: 'red',
    fontSize: '20px',
    justifyContent: 'center',
  };

  const scoreToPrecision = () => {
    if (score && score.hasOwnProperty('origin')) {
      return status ? `${status}(${score.origin})` : score.origin;
    }
    if (score === 0) return 0;
    else {
      return Number(score).toPrecision(1);
    }
  };
  return (
    <>
      <Row>
        <GaugeChart
          id={`gauge-chart-${id}-${index + 1}`}
          arcsLength={range ? range : [0.33, 0.33, 0.33]}
          animate={true}
          style={chartStyle}
          colors={colors ? colors : ['#ffb3b3', '#feffb3', '#ccffd6']}
          arcWidth={0.1}
          textColor={'#464A4F'}
          percent={score && score.fixed ? Number(score.fixed) : Number(score)}
          hideText={true}
        />
      </Row>
      {<Row className='justify-content-center'>{scoreToPrecision()}</Row>}
    </>
  );
}
