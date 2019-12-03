/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import { Progress } from 'react-sweet-progress';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GaugeChart from 'react-gauge-chart';
import GuageChartRange from '../GuageChartRange/GuageChartRange';
import 'react-sweet-progress/lib/style.css';
import './SearchResultItem.css';

export default function SearchResultItem({ item, index }) {
  let googleSentimentScore = 'N/A';
  let nodeSentimentScore = 0;
  let rudeScore = 'N/A';
  let magnitude = 'N/A';
  let nodeSentimentScoreStatus = 'Negative';
  let postContent;

  const fixedScore = score => {
    if (score === 0 || !score) {
      nodeSentimentScoreStatus = 'Average';
      return 0.5;
    }
    if (score > 0) {
      nodeSentimentScoreStatus = 'Positive';
      return 0.2;
    } else return 0.8;
  };

  if (Array.isArray(item)) {
    googleSentimentScore = item[0][2].score;
    nodeSentimentScore = {
      fixed: fixedScore(item[0][1]),
      origin: item[0][1] >= 0 || item[0][1] <= 0 ? item[0][1] : 0,
    };

    magnitude = item[0][2].magnitude;
    rudeScore = item[0][0];
    postContent = item[1];
  }

  if (postContent) {
    return (
      <ListGroup.Item action variant='light'>
        <Row className='align-items-center text-center'>
          <Col className='col-1'>
            <h6 className=''>{index + 1}</h6>
          </Col>
          <Col className='col-2'>
            {googleSentimentScore > 0 && (
              <GuageChartRange
                score={Number(googleSentimentScore)}
                index={index + 1}
                id={'google'}
              />
            )}
          </Col>
          <Col className='col-2'>
            {magnitude > 0 ? Number(magnitude).toPrecision(1) : 0}
          </Col>
          <Col className='col-2'>
            {
              <GuageChartRange
                score={nodeSentimentScore}
                index={index + 1}
                id={'node'}
                positiveNegativeChart={true}
                status={nodeSentimentScoreStatus}
              />
            }
          </Col>

          <Col className='col-2'>
            {rudeScore && (
              <Progress
                type='circle'
                strokeWidth={3}
                percent={rudeScore}
                width={50}
              />
            )}
          </Col>
          <Col className=''>
            <h6 className=''> {postContent}</h6>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  } else {
    return <li key={index}> {item} </li>;
  }
}
