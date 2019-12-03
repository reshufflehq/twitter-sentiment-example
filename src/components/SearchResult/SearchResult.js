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
  const items = [];
  const toxicityLevel = totals && `User average toxicity level ${totals.tox}%`;

  // if (details && details.length && details.length > 0) {
  //   items.push(<SearchResultGridHeaders />);
  //   for (let index = 0; index < details.length; index++) {
  //     const element = details[index];
  //     items.push(<SearchResultItem item={element} index={index} />);
  //   }
  // }

  return (
    <Container>
      <b>{toxicityLevel}</b>
      {/* <br />
      <br />
      {items} */}
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
