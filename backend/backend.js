import * as db from '@reshuffle/db';
import fetch from 'node-fetch';

const LINKS = 'links';
const Sentiment = require('sentiment');
var sentiment = new Sentiment();

const url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';

const token = process.env.TWITTER_DEV_KEY;
const Gtoken = process.env.GOOGLE_DEV_KEY;
const perspectiveUrl =
  `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${Gtoken}`;

const allKeysQuery = db.Q.filter(db.Q.key.startsWith('handle/'));

/* @expose */
export async function getHistory() {
  const result = await db.find(allKeysQuery);
  console.log(JSON.stringify(result));
  return result;
}

/* @expose */
export async function checkHandle(handle) {
  //try to hit cache
  let cache = await getCacheAanalysis(handle);
  if (cache) {
    return cache;
  }

  const results = await getTweets(handle);
  let totalSentimentScore = 0;
  let totalToxicScore = 0;
  let tweetsReviewed = 0;
  let analysis = { totals: { tox: 0, sentiment: 0 }, details: [] };

  for (var x = 0; x < 5; x++) {
    if (results[x]) {
      let clean = results[x].text;
      clean = clean.replace(/\B@[a-z0-9_-]+/gi, '');
      let toxic = await getToxicity(clean);
      let sentimentScore = sentiment.analyze(clean);
      let sum = toxic.attributeScores.SEVERE_TOXICITY.summaryScore.value;
      let score = Math.round(sum * 100);
      totalSentimentScore += sentimentScore;
      totalToxicScore += score;
      analysis.details.push([[score, sentimentScore.score], [results[x].text]]);
      tweetsReviewed++;
    }
  }
  analysis.totals.tox = totalToxicScore / tweetsReviewed;
  analysis.totals.sentiment = totalSentimentScore / tweetsReviewed;
  cacheAanalysis(handle, analysis);
  return analysis;
}

async function cacheAanalysis(key, analysis) {
  var response = await db.update(`handle/${key}`, () => {
    return analysis;
  });
}

async function getCacheAanalysis(key) {
  const result = await db.get(`handle/${key}`);
  return result;
}

function json(response) {
  return response.json();
}

async function getToxicity(text) {
  var regtext = text.replace(/"/g, `'`);
  const results = await fetch(perspectiveUrl, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: `{
      "comment":{text: "${regtext}"},
      "languages": ["en"],
      "requestedAttributes":{SEVERE_TOXICITY:{}}, 
      }`,
  })
    .then(json)
    .then(function(data) {
      //console.log('Request succeeded with JSON response', JSON.stringify(data));
      return data;
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });

  return results;
}

async function getTweets(handle) {
  const results = await fetch(
    `${url}?screen_name=${handle}&count=5&exclude_replies=true`,
    {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    },
  )
    .then(json)
    .then(function(data) {
      //console.log('Request succeeded with JSON response', data);
      return data;
    })
    .catch(function(error) {
      //console.log('Request failed', error);
    });

  return results;
}

/**
 * Delete link from the list by link id
 *
 * @param { string } url - link of the image to be deleted
 *
 * @return { array } - updated list with all cats links after the link was deleted
 */
/* @expose */
export async function deleteLink(url) {
  return update(LINKS, (list = []) => list.filter(link => link !== url));
}

/**
 * List of all cats images urls
 *
 * @return { array } - list with all cats links
 */
/* @expose */
export async function getLinks() {
  return get(LINKS) || [];
}
