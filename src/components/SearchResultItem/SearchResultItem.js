/* eslint-disable react/prop-types */
import '@reshuffle/code-transform/macro';
import React from 'react';
import { Progress } from 'react-sweet-progress';
import GaugeChartRangeGoogle from '../GaugeChartRange/GaugeChartRangeGoogle';
import GaugeChartRangeNode from '../GaugeChartRange/GaugeChartRangeNode';
import 'react-sweet-progress/lib/style.css';
import './SearchResultItem.css';

export default function SearchResultItem({ item, index }) {
  let googleSentimentScore = 'N/A';
  let nodeSentimentScore = 0;
  let rudeScore = 'N/A';
  let postContent;

  if (Array.isArray(item)) {
    googleSentimentScore = item[0][2].score;
    nodeSentimentScore = item[0][1];
    rudeScore = item[0][0];
    postContent = item[1];
  }

  if (postContent) {
    return (
      <tr variant='light'>
        <td>{index + 1}</td>
        <td>
          <GaugeChartRangeGoogle
            score={googleSentimentScore}
            index={index + 1}
            width={'60%'}
          />
        </td>
        <td>
          <GaugeChartRangeNode
            score={nodeSentimentScore}
            index={index + 1}
            width={'60%'}
          />
        </td>
        <td>
          {rudeScore && (
            <Progress
              type='circle'
              strokeWidth={3}
              percent={rudeScore}
              width={50}
            />
          )}
        </td>
        <td>
          {' '}
          <h6 className='post-content'> {postContent}</h6>
        </td>
      </tr>
    );
  } else {
    return <li key={index}> {item} </li>;
  }
}
