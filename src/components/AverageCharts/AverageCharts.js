/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GaugeChartRangeNode from '../GaugeChartRange/GaugeChartRangeNode';
import GaugeChartRangeGoogle from '../GaugeChartRange/GaugeChartRangeGoogle';
import { Progress } from 'react-sweet-progress';
import './AverageCharts.css';

export default function AverageCharts({ totals }) {
  const nodeSentimentScore = totals && totals.sentiment;
  const googleSentimentScore = totals && totals.google_sentiment;
  if (!totals) return;
  return (
    <Container className='justify-content-md-center pt-5'>
      <Row>
        <Col xs={6} md={2} className='level-text text-right mt-0 '>
          Average Google Sentiment:
        </Col>
        <Col xs={6} md={2}>
          <GaugeChartRangeGoogle score={googleSentimentScore} index={34} />
        </Col>
        <Col xs={6} md={2} className='level-text text-right mt-0'>
          Average Node Sentiment:
        </Col>
        <Col xs={6} md={2}>
          <GaugeChartRangeNode score={nodeSentimentScore} index={43} />
        </Col>
        <Col xs={6} md={2} className='level-text text-right mt-0'>
          Average Toxicity Level
        </Col>
        <Col xs={6} md={2} className='justify-content-center'>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Progress
              type='circle'
              strokeWidth={5}
              percent={totals.tox}
              width={80}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
