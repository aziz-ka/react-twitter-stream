module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
  indexRoute: "/",
  pageRoute: "/page/:page/:skip",
  twitter: {
    consumer_key: 'TWITTER_CONSUMER_KEY',
    consumer_secret: 'TWITTER_CONSUMER_SECRET',
    access_token: 'TWITTER_ACCESS_TOKEN',
    access_token_secret: 'TWITTER_ACCESS_TOKEN_SECRET'
  }
}