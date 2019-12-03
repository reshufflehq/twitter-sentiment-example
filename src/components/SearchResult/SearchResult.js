/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import SearchResultItem from '../SearchResultItem/SearchResultItem';
import SearchResultGridHeaders from '../SearchResultGridHeaders/SearchResultGridHeaders';

export default function SearchResult({ result }) {
  const { details, totals } = result;

  return (
    <Container>
      <b>{totals && `User average toxicity level ${totals.tox}%`}</b>

      {details && (
        <Row>
          <ListGroup variant='flush' className='w-100'>
            <SearchResultGridHeaders />
            {details.map((element, index) => (
              <SearchResultItem item={element} index={index} />
            ))}
          </ListGroup>
        </Row>
      )}
    </Container>
  );
}
