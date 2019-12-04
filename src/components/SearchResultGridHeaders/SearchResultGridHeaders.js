import '@reshuffle/code-transform/macro';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './SearchResultGridHeaders.css';

export default function SearchResultGridHeaders() {
  return (
    <thead>
      <tr className=''>
        <th>#</th>
        <th>Google Sentiment Score</th>
        <th>Node Sentiment Score</th>
        <th>Toxicity level</th>
        <th>Post Content</th>
      </tr>
    </thead>
  );
}
