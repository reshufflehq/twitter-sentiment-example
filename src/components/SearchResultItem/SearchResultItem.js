/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import { Progress } from 'react-sweet-progress';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-sweet-progress/lib/style.css';
import './SearchResultItem.css';

export default function SearchResultItem({ item, key }) {
  let sentimentScore = 'N/A';
  let rudeScore = 'N/A';
  let postContent;

  if (Array.isArray(item)) {
    sentimentScore = item[0][1];
    rudeScore = item[0][0];
    postContent = item[1];
  }

  if (postContent) {
    return (
      <ListGroup.Item action variant='light'>
        <Row className='align-items-center'>
          <Col className='col-1'>
            <h6 className=''>{key + 1}</h6>
          </Col>
          <Col className='col-2'>
            {sentimentScore > 0 && (
              <Progress
                type='circle'
                strokeWidth={3}
                percent={(sentimentScore / 5) * 100}
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
    return <li key={key}> {item} </li>;
  }
}
