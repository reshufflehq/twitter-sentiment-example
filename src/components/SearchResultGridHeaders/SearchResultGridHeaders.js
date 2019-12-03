import '@reshuffle/code-transform/macro';
import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './SearchResultGridHeaders.css';

export default function SearchResultGridHeaders() {
  return (
    <Row className='align-items-center header-padding'>
      <Col className='col-1'>
        <h6 className=''>#</h6>
      </Col>
      <Col className='col-2'>
        <h6 className=''>Sentiment Score</h6>
      </Col>
      <Col className='col-2'>
        <h6 className=''>Likely to be rude %</h6>
      </Col>
      <Col className=''>
        <h6 className=''>Post Content</h6>
      </Col>
    </Row>
  );
}
