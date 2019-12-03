/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import SearchResultItem from '../SearchResultItem/SearchResultItem';
import SearchResultGridHeaders from '../SearchResultGridHeaders/SearchResultGridHeaders';
import AverageCharts from '../AverageCharts/AverageCharts';
import './SearchResult.css';

export default function SearchResult({ result }) {
  const { details, totals } = result;

  return (
    <Container>
      <AverageCharts totals={totals} />

      {details && (
        <Row>
          <ListGroup variant='flush' className='w-100'>
            <SearchResultGridHeaders />
            {details.map((element, index) => (
              <SearchResultItem key={index} item={element} index={index} />
            ))}
          </ListGroup>
        </Row>
      )}
    </Container>
  );
}
