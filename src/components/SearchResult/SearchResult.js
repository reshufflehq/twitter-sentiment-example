/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import Container from 'react-bootstrap/Container';

export default function SearchResult({ result }) {
  const { details, totals } = result;
  const items = [];
  let toxicityLevel = null;

  if (details && details.length && details.length > 0) {
    for (let index = 0; index < details.length; index++) {
      const element = details[index];
      if (Array.isArray(element)) {
        items.push(
          <li key={index}>
            <b>
              <i>
                Sentiment score is {element[0][1]}, and {element[0][0]}% likely
                to be rude:
              </i>
            </b>
            <br />
            {element[1]}
          </li>,
        );
      } else {
        items.push(<li key={index}> {element} </li>);
      }
    }
    toxicityLevel = `User average toxicity level ${totals.tox}%`;
  }

  return (
    <Container>
      <b>{toxicityLevel}</b>
      <br />
      <br />
      {items}
    </Container>
  );
}
