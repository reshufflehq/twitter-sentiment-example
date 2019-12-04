import '@reshuffle/code-transform/macro';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './SearchResultGridHeaders.css';

export default function SearchResultGridHeaders() {
  return (
    <Container className='pt-5 pb-5'>
      <h3 className='results-title'>Tweets</h3>
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
    </Container>
  );
}
