import '@reshuffle/code-transform/macro';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import SearchContainer from '../SearchContainer/SearchContainer';
import { checkHandle, getHistory } from '../../../backend/backend';
import './Admin.css';
import SearchResultContainer from '../SearchResultContainer/SearchResultContainer';

export default function Admin() {
  const { id } = useParams();
  const [inputValue] = useState(id);
  const [display, setDisplay] = useState(['Waiting for your input']);
  const [history, setHistory] = useState(['']);

  useEffect(() => {
    const handleAddLink = async () => {
      try {
        const text = inputValue;
        let lastHistory = null;
        // prevent empty string to add in list
        if (!text || text === '') {
          lastHistory = await getHistory();
          setHistory(lastHistory);
          return;
        }

        const result = await checkHandle(text);
        setDisplay(result);

        lastHistory = await getHistory();
        setHistory(lastHistory);
      } catch (error) {
        console.error('Error on adding link to db');
      }
    };
    handleAddLink();
  }, [inputValue]);

  return (
    <Container className='mt-4 mb-5'>
      <SearchContainer />
      <SearchResultContainer result={display} history={history} />
    </Container>
  );
}
