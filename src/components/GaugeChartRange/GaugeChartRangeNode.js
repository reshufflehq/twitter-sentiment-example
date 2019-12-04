/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import GaugeChart from 'react-gauge-chart';
import Row from 'react-bootstrap/Row';

const DEFAULT_NODE_RANGE = [0.375, 0.25, 0.375];
const ID = 'NODE';
const DEFAULT_NODE_COLORS = ['#eb0000', '#d6da1d', '#008A1C'];

export default function GaugeChartRangeGoogle({ score, index, width }) {
  let nodeSentimentScoreStatus = 'Negative';

  const chartStyle = {
    width: `${width ? width : '100%'}`,
    color: 'red',
    fontSize: '20px',
    justifyContent: 'center',
  };

  const fixedNodeScoreToFitChart = score => {
    const scoreToNumber = Number(score);
    if (scoreToNumber === 0) {
      nodeSentimentScoreStatus = 'Neutral';
      return 0.5;
    }
    if (scoreToNumber > 0) {
      nodeSentimentScoreStatus = 'Positive';
      return 0.8;
    } else return 0.2;
  };

  const scoreToPrecision = () => {
    return `${nodeSentimentScoreStatus}(${Number(score).toPrecision(1)})`;
  };

  return (
    <>
      <Row className='d-flex mr-0 ml-0 justify-content-center'>
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
