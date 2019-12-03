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
      <Row>
        <Col className='col-md-7 col-sm-10'>
          <h2 className='pt-4 pb-4'>
            How rude are the following person&quot;s Tweets?
          </h2>
          <Row className='mr-0 ml-0 pb-4'>
            <Col className='pl-0 pr-0'>
              <Form.Control
                as='input'
                type='text'
                placeholder='Enter Twitter Handle'
                className='input-control'
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleChange}
              />
            </Col>
            <Col className='col-1 pl-1 pr-0'>
              <Button onClick={handleNewCheck} className='url-add'>
                Check
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
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
