import '@reshuffle/code-transform/macro';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './SearchBar.css';

export default function SearchBar() {
  const { id } = useParams();
  const [inputValue, setInputValue] = useState(id);

  const handleNewCheck = async () => {
    if (inputValue) window.location.replace(`/handle/${inputValue}`);
  };

  const handleChange = ({ which, target, keyCode }) => {
    if (which === 13 || keyCode === 13) {
      handleNewCheck();
      return;
    }
    setInputValue(target.value);
  };

  return (
    <div className='search-bar-wrapper'>
      <Form.Control
        as='input'
        type='text'
        placeholder='Enter Twitter Handle'
        className='input-control'
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleChange}
      />
      <Button onClick={handleNewCheck} className='search-btn'>
        Check
      </Button>
    </div>
  );
}
