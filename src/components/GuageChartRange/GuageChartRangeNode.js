/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import GaugeChart from 'react-gauge-chart';
import Row from 'react-bootstrap/Row';

const DEFAULT_NODE_RANGE = [0.375, 0.25, 0.375];
const ID = 'NODE';
const DEFAULT_NODE_COLORS = ['#ffb3b3', '#feffb3', '#ccffd6'];

export default function GuageChartRangeGoogle({ score, index, width }) {
  let nodeSentimentScoreStatus = 'Negative';

  const chartStyle = {
    width: `${width ? width : '90%'}`,
    color: 'red',
    fontSize: '20px',
    justifyContent: 'center',
  };

  const fixedNodeScoreToFitChart = score => {
    if (score == 0) {
      nodeSentimentScoreStatus = 'Neutral';
      return 0.5;
    }
    if (score > 0) {
      nodeSentimentScoreStatus = 'Positive';
      return 0.8;
    } else return 0.2;
  };

  const scoreToPrecision = () => {
    return `${nodeSentimentScoreStatus}(${Number(score).toPrecision(1)})`;
  };

  return (
    <>
      <Row>
        <GaugeChart
          id={`gauge-chart-${ID}-${index + 1}`}
          arcsLength={DEFAULT_NODE_RANGE}
          animate={true}
          style={chartStyle}
          colors={DEFAULT_NODE_COLORS}
          arcWidth={0.1}
          percent={fixedNodeScoreToFitChart(score)}
          hideText={true}
        />
      </Row>
      {<Row className='justify-content-center'>{scoreToPrecision()}</Row>}
    </>
  );
}
