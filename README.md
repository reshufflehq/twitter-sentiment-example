This is a [Reshuffle](https://reshuffle.com/) template.

## About

This is an example of running sentiment analysis on Tweets. This example uses the Twitter API to extract the latest tweets of a given handle, and runs several toxicity and sentiment analysis algorithms over it (Google’s sentiment analysis, a popular Node package, and Perspective API). Please remix to create your own sentiment analysis app for Facebook for example, or using the Azure sentiment analysis for example.

## Screenshots

<img src="./thumbnail.png" width='50%' >

## Configuring a Google API Key and Twitter API key

This template need to have 2 API keys: a Google API key and Twitter API key and Google Application Credentials file, these keys and file are not included in this project.

Without the keys and Google Application Credentials file, the search won't show results.

#### How to obtain and use your own Google API key:

1. Obtain a key following [these instructions](https://github.com/conversationai/perspectiveapi/tree/master/1-get-started) (Skip this step if you already have a key)
2. Create a .env file in the root directory of the template
3. Insert the following line inside the .env file, replacing `<Your API KEY>` with your API key:

```
GOOGLE_DEV_KEY=<YOUR API KEY>
```

#### How to obtain and use your own Twitter API key:

1. Obtain a key following [these instructions](https://developer.twitter.com/en/docs/basics/authentication/guides/bearer-tokens) (Skip this step if you already have a key)
2. Insert the following line inside the .env file, replacing `<Your API KEY>` with your API key:

```
TWITTER_DEV_KEY=<YOUR API KEY>
```

#### How to obtain and use your own Google Application Credentials file:

1. Obtain a key following [these instructions](https://cloud.google.com/natural-language/docs/quickstart-client-libraries#client-libraries-install-nodejs) (Skip this step if you already have a key)
2. Add your Google Application Credentials file to the folder backend.
3. Insert the following line inside the .env file, replacing `<Your File Name>` with your file name:

GOOGLE_APPLICATION_CREDENTIALS ='./backend/<Your File Name>

Example:

GOOGLE_APPLICATION_CREDENTIALS ='./backend/API-Project-bf5cbda041c7.json
