import mongoose from "mongoose";

const tweetModel = new mongoose.Schema({
  tweetId: String,
  active: Boolean,
  author: String,
  avatar: String,
  body: String,
  date: Date,
  screenName: String
});

// Create a static getTweets method to return tweet data from the db
tweetModel.statics.getTweets = (page, skip, callback) => {
  let tweets = [],
      start = (page * 10) + (skip * 1);

  // Query the db, using skip and limit to achieve page chunks
  Tweet.find({}, "tweetId active author avatar body date screenName", {skip: start, limit: 10}).sort({date: "desc"}).exec((err, result) => {
    if(err) throw err;

    tweets = result;
    
    tweets.forEach((tweet) => {
      // Set tweets to active
      tweet.active = true;
    });

    callback(tweets);
  });
}

const Tweet = mongoose.model("Tweet", tweetModel);

module.exports = Tweet;