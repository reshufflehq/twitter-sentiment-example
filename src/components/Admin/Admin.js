import '@reshuffle/code-transform/macro';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PreviewFrame from '../PreviewFrame';
import HistoryTable from '../HistoryTable';
import SearchContainer from '../SearchContainer/SearchContainer';
import { checkHandle, getHistory } from '../../../backend/backend';
import './Admin.css';

export default function Admin() {
  const { id } = useParams();
  const [inputValue, setInputValue] = useState(id);
  const [display, setDisplay] = useState(['Waiting for your input']);
  const [history, setHistory] = useState(['']);

  useEffect(() => {
    handleAddLink();
  }, []);

  const handleAddLink = async () => {
    try {
      const text = inputValue;

      // prevent empty string to add in list
      if (!text || text == '') return;

      const result = await checkHandle(text);
      setDisplay(result);

      let lastHistory = await getHistory();
      setHistory(lastHistory);
    } catch (error) {
      console.error('Error on adding link to db');
    }
  };

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
    <Container className='mt-4 mb-5'>
      <SearchContainer />
      <Row>
        <Col>
          <PreviewFrame value={display}></PreviewFrame>
          <br />
          <br />
          <div>
            <HistoryTable value={history}></HistoryTable>
          </div>
          <br />
          <br />
          <div>
            <i>
              Toxicity according to Google{' '}
              <a href='https://www.perspectiveapi.com/#/home'>
                Perspective API
              </a>
              , Sentiment according to{' '}
              <a href='https://www.npmjs.com/package/sentiment'>Sentiment</a>
            </i>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
