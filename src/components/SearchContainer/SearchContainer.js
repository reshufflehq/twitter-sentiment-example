import '@reshuffle/code-transform/macro';
import React from 'react';

import Row from 'react-bootstrap/Row';
import SearchBar from '../SearchBar/SearchBar';
import './SearchContainer.css';

export default function SearchContainer() {
  return (
    <Row className='bg-search'>
      <div className='search-container'>
        <div className='search-title'>
          How rude are the following handle&apos;s Tweets?
        </div>
        <SearchBar />
      </div>
    </Row>
  );
}
