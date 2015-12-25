import React from "react";
import TweetsApp from "./components/TweetsApp";
import Tweet from "./models/Tweet";

module.exports = {
  index: (req, res) => {
    // Call static model method to get tweets in the db
    Tweet.getTweets(0, 0, (tweets) => {

      // Render React to a string, passing in our fetched tweets
      const markup = React.renderToString(
        React.createFactory(TweetsApp)({
          tweets
        })
      );

      // Render our 'home' template
      res.render('home', {
        markup, // Pass rendered react markup
        state: JSON.stringify(tweets) // Pass current state to client side
      });

    });
  },

  page: (req, res) => {
    // Fetch tweets by page via param
    Tweet.getTweets(req.params.page, req.params.skip, (tweets) => {
      // Render as JSON
      res.send(tweets);
    });
  }
}