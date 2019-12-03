/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import { Progress } from 'react-sweet-progress';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GuageChartRange from '../GuageChartRange/GuageChartRange';
import 'react-sweet-progress/lib/style.css';
import './SearchResultItem.css';

export default function SearchResultItem({ item, index }) {
  let googleSentimentScore = 'N/A';
  let nodeSentimentScore = 0;
  let rudeScore = 'N/A';
  let magnitude = 'N/A';
  let nodeSentimentScoreStatus = 'Negative';
  const googleSentimentScoreChartRange = [0.375, 0.25, 0.375];
  let postContent;

  const fixedNodeScoreToFitChart = score => {
    if (score === 0 || !score) {
      nodeSentimentScoreStatus = 'Neutral';
      return 0.5;
    }
    if (score > 0) {
      nodeSentimentScoreStatus = 'Positive';
      return 0.2;
    } else return 0.8;
  };

  //score range is between -1 t0 1 converted to percents is 0-0.375 (red), 0.375-0.625 (yellow), 0.625-1(green)
  const fixedGoogleScoreToFitChart = score => {
    if (score === 0 || !score) {
      return 0;
    }
    return (parseFloat(score) + 1) / 2;
  };

  if (Array.isArray(item)) {
    googleSentimentScore = {
      fixed: fixedGoogleScoreToFitChart(item[0][2].score),
      origin: item[0][2].score,
    };
    nodeSentimentScore = {
      fixed: fixedNodeScoreToFitChart(item[0][1]),
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
            {
              <GuageChartRange
                score={googleSentimentScore}
                index={index + 1}
                range={googleSentimentScoreChartRange}
                id={'google'}
                status={''}
              />
            }
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
                status={nodeSentimentScoreStatus}
                colors={['#ccffd6', '#feffb3', '#ffb3b3']}
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
