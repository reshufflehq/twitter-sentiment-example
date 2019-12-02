import '@reshuffle/code-transform/macro';
import React from 'react';

import Row from 'react-bootstrap/Row';
import SearchBar from '../SearchBar/SearchBar';
import './SearchContainer.css';

export default function SearchContainer() {
  return (
    <Row className='bg-search'>
      <div>
        <h2 className='pt-4 pb-4 search-title'>
          How rude are the following person`s Tweets?
        </h2>
        <SearchBar />
      </div>
    </Row>
  );
}
