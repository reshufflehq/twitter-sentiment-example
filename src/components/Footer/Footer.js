import React from 'react';

import './Footer.css';

export default function Footer() {
  return (
    <div>
      <i>
        Toxicity according to Google{' '}
        <a href='https://www.perspectiveapi.com/#/home'>Perspective API</a>,
        Sentiment according to{' '}
        <a href='https://www.npmjs.com/package/sentiment'>Sentiment</a>
      </i>
    </div>
  );
}
