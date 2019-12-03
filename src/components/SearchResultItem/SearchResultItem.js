/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import { Progress } from 'react-sweet-progress';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-sweet-progress/lib/style.css';
import './SearchResultItem.css';

export default function SearchResultItem({ item, index }) {
  let googleSentimentScore = 'N/A';
  let nodeSentimentScore = 'N/A';
  let rudeScore = 'N/A';
  let magnitude = 'N/A';
  let postContent;

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
        <Row className='align-items-center'>
          <Col className='col-1'>
            <h6 className=''>{index + 1}</h6>
          </Col>
          <Col className='col-2'>
            {googleSentimentScore > 0 && (
              <Progress
                type='circle'
                strokeWidth={3}
                percent={googleSentimentScore}
                width={50}
              />
            )}
          </Col>
          <Col className='col-2'>
            {nodeSentimentScore > 0 && (
              <Progress
                type='circle'
                strokeWidth={3}
                percent={nodeSentimentScore}
                width={50}
              />
            )}
          </Col>
          <Col className='col-2'>
            {magnitude && (
              <Progress
                type='circle'
                strokeWidth={3}
                percent={magnitude}
                width={50}
              />
            )}
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
