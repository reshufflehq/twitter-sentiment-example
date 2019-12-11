import * as db from '@reshuffle/db';
import fetch from 'node-fetch';

const LINKS = 'links';
const Sentiment = require('sentiment');
var sentiment = new Sentiment();

const url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';

const token = process.env.TWITTER_DEV_KEY;
const Gtoken = process.env.GOOGLE_DEV_KEY;
const googleAppCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;

const perspectiveUrl = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${Gtoken}`;

const allKeysQuery = db.Q.filter(db.Q.key.startsWith('handle/'));

// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient();

/* @expose */
export async function getHistory() {
  const result = await db.find(allKeysQuery);
  //console.log(JSON.stringify(result));
  return result;
}

/* @expose */
export async function checkHandle(handle) {
  let cleanHandle = handle.toLowerCase();
  cleanHandle = cleanHandle.replace(/[|&;$%@"<>()+,]/g, '');
  //try to hit cache
  let cache = await getCacheAnalysis(cleanHandle);
  if (cache) {
    return cache;
  }

  const results = await getTweets(cleanHandle);
  console.log(JSON.stringify(results));
  if (!results || results.length == 0 || results.error || results.errors) return "not found";
  let totalSentimentScore = 0;
  let totalToxicScore = 0;
  let tweetsReviewed = 0;
  let GoogleSentimentCollection = [];
  let analysis = {
    totals: { tox: 0, sentiment: 0, google_sentiment: 0 },
    details: [],
  };

  for (var x = 0; x < 8; x++) {
    if (results[x]) {
      let clean = results[x].full_text;
      clean = clean.replace(/\B@[a-z0-9_-]+/gi, '');
      let toxic = await getToxicity(clean);
      let googleSentiment = await getGoogleSentiment(clean);
      for (
        let index = 0;
        index < Math.ceil(googleSentiment.magnitude);
        index++
      ) {
        GoogleSentimentCollection.push(googleSentiment.score);
      }
      let sentimentScore = sentiment.analyze(clean);
      let sum = toxic.attributeScores.SEVERE_TOXICITY.summaryScore.value;
      let score = Math.round(sum * 100);
      totalSentimentScore += parseFloat(sentimentScore.score);
      totalToxicScore += score;
      analysis.details.push([
        [score, sentimentScore.score, googleSentiment],
        [results[x].full_text],
      ]);
      tweetsReviewed++;
    }
  }
  analysis.totals.tox = (totalToxicScore / tweetsReviewed).toPrecision(2);
  analysis.totals.sentiment = (
    totalSentimentScore / tweetsReviewed
  ).toPrecision(2);
  var googleSum = 0;
  for (var i = 0; i < GoogleSentimentCollection.length; i++) {
    googleSum = googleSum + parseFloat(GoogleSentimentCollection[i]);
    googleSum = Math.round(googleSum * 1000) / 1000;
  }
  const googLen = GoogleSentimentCollection.length;
  let googleAvg = googLen ? googleSum / GoogleSentimentCollection.length : 0;
  analysis.totals.google_sentiment = parseFloat(googleAvg.toPrecision(2));
  if (analysis.totals.tox) cacheAnalysis(cleanHandle, analysis);
  return analysis;
}

async function cacheAnalysis(key, analysis) {
  var response = await db.update(`handle/${key}`, () => {
    return analysis;
  });
}

async function getCacheAnalysis(key) {
  const result = await db.get(`handle/${key}`);
  return result;
}

function json(response) {
  return response.json();
}

async function getToxicity(text) {
  var regex = text.replace(/"/g, `'`);
  const results = await fetch(perspectiveUrl, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: `{
      "comment":{text: "${regex}"},
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

async function getGoogleSentiment(text) {
  let document = {
    content: text,
    type: 'PLAIN_TEXT',
  };
  // Detects the sentiment of the text
  const [result] = await client.analyzeSentiment({ document: document });
  let sentiment = result.documentSentiment;

  //console.log(`Text: ${text}`);
  //console.log(`Sentiment score: ${sentiment.score}`);
  //console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
  // console.log(`Sentiment everything: ${JSON.stringify(sentiment)}`);
  sentiment.score = sentiment.score.toPrecision(2);
  sentiment.magnitude = sentiment.magnitude.toPrecision(2);
  return sentiment;
}

async function getTweets(handle) {
  const results = await fetch(
    `${url}?screen_name=${handle}&tweet_mode=extended&count=8&exclude_replies=true`,
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
      //console.log('Request succeeded with JSON response', JSON.stringify(data));
      return data;
    })
    .catch(function(error) {
      console.error(error);
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

/* @expose */
export async function hasCredentials() {
  return token && Gtoken && googleAppCredentials;
}
