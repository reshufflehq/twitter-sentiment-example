/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import { Progress } from 'react-sweet-progress';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GaugeChartRangeGoogle from '../GaugeChartRange/GaugeChartRangeGoogle';
import GaugeChartRangeNode from '../GaugeChartRange/GaugeChartRangeNode';
import 'react-sweet-progress/lib/style.css';
import './SearchResultItem.css';

export default function SearchResultItem({ item, index }) {
  let googleSentimentScore = 'N/A';
  let nodeSentimentScore = 0;
  let rudeScore = 'N/A';
  let magnitude = 'N/A';
  let nodeSentimentScoreStatus = 'Negative';
  let postContent;

  // const fixedNodeScoreToFitChart = score => {
  //   if (score === 0 || !score) {
  //     nodeSentimentScoreStatus = 'Neutral';
  //     return 0.5;
  //   }
  //   if (score > 0) {
  //     nodeSentimentScoreStatus = 'Positive';
  //     return 0.2;
  //   } else return 0.8;
  // };

  // //score range is between -1 t0 1 converted to percents is 0-0.375 (red), 0.375-0.625 (yellow), 0.625-1(green)
  // const fixedGoogleScoreToFitChart = score => {
  //   if (score === 0 || !score) {
  //     return 0;
  //   }
  //   return (parseFloat(score) + 1) / 2;
  // };

  if (Array.isArray(item)) {
    googleSentimentScore = item[0][2].score;
    nodeSentimentScore = item[0][1];
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
              <GaugeChartRangeGoogle
                score={googleSentimentScore}
                index={index + 1}
              />
            }
          </Col>
          <Col className='col-2'>
            {
              <GaugeChartRangeNode
                score={nodeSentimentScore}
                index={index + 1}
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
            <h6 className='post-content'> {postContent}</h6>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  } else {
    return <li key={index}> {item} </li>;
  }
}
