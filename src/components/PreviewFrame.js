/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import Container from 'react-bootstrap/Container';

export default function PreviewFrame(props) {
  const items = [];
  let summey = null;
  if (
    props.value.details &&
    props.value.details.length &&
    props.value.details.length > 0
  ) {
    const details = props.value.details;
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
    summey = `User average toxicity level ${props.value.totals.tox}%`;
  }

  return (
    <Container>
      <b>{summey}</b>
      <br />
      <br />
      {items}
    </Container>
  );
}
