/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import GaugeChart from 'react-gauge-chart';
import Row from 'react-bootstrap/Row';

const DEFAULT_GOOGLE_RANGE = [0.375, 0.25, 0.375];
const ID = 'google';
const DEFAULT_GOOGLE_COLORS = ['#eb0000', '#d6da1d', '#008A1C'];

export default function GaugeChartRangeGoogle({ score, index, width }) {
  const chartStyle = {
    width: `${width ? width : '100%'}`,
    color: 'red',
    fontSize: '20px',
    justifyContent: 'center',
  };

  //score range is between -1 t0 1 converted to percents is 0-0.375 (red), 0.375-0.625 (yellow), 0.625-1(green)
  const fixedGoogleScoreToFitChart = () => {
    return (parseFloat(score) + 1) / 2;
  };

  const scoreToPrecision = () => {
    if (score > 0.25) {
      return `Positive(${Number(score).toPrecision(1)}) `;
    } else if (score > -0.25) {
      return `Neutral(${Number(score).toPrecision(1)}) `;
    } else {
      return `Negative(${Number(score).toPrecision(1)}) `;
    }
  };
  return (
    <>
      <Row className='d-flex mr-0 ml-0 justify-content-center'>
        <GaugeChart
          id={`gauge-chart-${ID}-${index + 1}`}
          arcsLength={DEFAULT_GOOGLE_RANGE}
          animate={true}
          style={chartStyle}
          colors={DEFAULT_GOOGLE_COLORS}
          arcWidth={0.1}
          percent={fixedGoogleScoreToFitChart()}
          hideText={true}
        />
      </Row>
      {<Row className='justify-content-center'>{scoreToPrecision()}</Row>}
    </>
  );
}
