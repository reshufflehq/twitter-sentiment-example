import '@reshuffle/code-transform/macro';
import React, { useEffect, useState } from 'react';

import Row from 'react-bootstrap/Row';
import SearchBar from '../SearchBar/SearchBar';
import ApiKeyNav from '../ApiKeyNav/ApiKeyNav';
import './SearchContainer.css';

import { hasCredentials } from '../../../backend/backend';

// In order to run this template you will need to provide API credentials
export default function SearchContainer() {
  const [hasCreds, setHasCreds] = useState(true);
  useEffect(() => {
    const checkCredentials = async () => {
      const maybeCreds = await hasCredentials();
      setHasCreds(maybeCreds);
    };
    checkCredentials();
  }, []);
  return (
    <>
      {!hasCreds && <ApiKeyNav />}
      <Row className='bg-search'>
        <div className='search-container'>
          <div className='search-title'>
            How rude are the following handle&apos;s Tweets?
          </div>
          <SearchBar />
        </div>
      </Row>
    </>
  );
}
