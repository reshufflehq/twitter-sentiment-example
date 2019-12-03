/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchResultItem from '../SearchResultItem/SearchResultItem';
import SearchResultGridHeaders from '../SearchResultGridHeaders/SearchResultGridHeaders';
import { Progress } from 'react-sweet-progress';
import './SearchResult.css';

export default function SearchResult({ result }) {
  const { details, totals } = result;

  return (
    <Container>
      <Row className='p-5'>
        <Col className='level-text text-right pt-1'>
          {totals && `User average toxicity level: `}
        </Col>
        <Col>
          {totals && (
            <Progress
              type='circle'
              strokeWidth={5}
              percent={totals.tox}
              width={100}
            />
          )}
        </Col>
      </Row>

      {details && (
        <Row>
          <ListGroup variant='flush' className='w-100'>
            <SearchResultGridHeaders />
            {details.map((element, index) => (
              <SearchResultItem item={element} key={index} />
            ))}
          </ListGroup>
        </Row>
      )}
    </Container>
  );
}
