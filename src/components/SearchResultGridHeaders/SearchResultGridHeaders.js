import '@reshuffle/code-transform/macro';
import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './SearchResultGridHeaders.css';

export default function SearchResultGridHeaders() {
  return (
    <Row className='align-items-center header-padding text-center'>
      <Col className='col-1'>
        <h6 className=''>#</h6>
      </Col>
      <Col className='col-2'>
        <h6 className=''>Google Sentiment Score</h6>
      </Col>
      <Col className='col-2'>
        <h6 className=''>Node Sentiment Score</h6>
      </Col>
      <Col className='col-2'>
        <h6 className=''>Toxicity level</h6>
      </Col>
      <Col className=''>
        <h6 className=''>Post Content</h6>
      </Col>
    </Row>
  );
}
