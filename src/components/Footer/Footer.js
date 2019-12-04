import React from 'react';

import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div>
        <i>
          Toxicity according to Google{' '}
          <a href='https://www.perspectiveapi.com/#/home'>Perspective API</a>,
          Sentiment according to Node{' '}
          <a href='https://www.npmjs.com/package/sentiment'>Sentiment</a> and{' '}
          <a href='https://cloud.google.com/natural-language/'>
            Google Sentiment Analysis
          </a>
          .
        </i>
      </div>
      <div>
        <br></br>
        Life is work in Progress - This is an open source project, you can check the source, remix it, and
        run your own at this{' '}
        <a href='https://reshuffle.com/template/twitter-sentiment-analysis'>Reshuffle template</a>.
      </div>
    </footer>
  );
}
