import Tweet from "../models/Tweet";

module.exports = (tweet, io) => {
  // When tweets get sent our way ...
  const nextTweet = {
    tweetId: tweet["id"],
    active: false,
    author: tweet["user"]["name"],
    avatar: tweet["user"]["profile_image_url"],
    body: tweet["text"],
    date: tweet["created_at"],
    screenName: tweet["user"]["screen_name"]
  };

  // Create a new model instance with our object
  const newTweet = new Tweet(nextTweet);

  newTweet.save((err) => {
    if(err) throw err;
    io.emit("tweet", nextTweet);
  });
}