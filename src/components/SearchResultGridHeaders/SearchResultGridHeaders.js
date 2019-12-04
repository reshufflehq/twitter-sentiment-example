import '@reshuffle/code-transform/macro';
import React from 'react';
import './SearchResultGridHeaders.css';

export default function SearchResultGridHeaders() {
  return (
    <thead>
      <tr>
        <th>#</th>
        <th>Google Sentiment Score</th>
        <th>Node Sentiment Score</th>
        <th>Toxicity level</th>
        <th>Post Content</th>
      </tr>
    </thead>
  );
}
