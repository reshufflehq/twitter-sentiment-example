/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchResult from '../SearchResult/SearchResult';
import HistoryTable from '../HistoryTable/HistoryTable';
import Footer from '../Footer/Footer';
import './SearchResultContainer.css';

export default function SearchResultContainer({ result, history }) {
  return (
    <React.Fragment>
      <Row>
        <Col>
          {result.details && <SearchResult result={result}></SearchResult>}
          <HistoryTable history={history}></HistoryTable>
        </Col>
      </Row>
      <Footer />
    </React.Fragment>
  );
}
