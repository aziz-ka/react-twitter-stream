import React from 'react';
import Tweet from './Tweet';

const Tweets = React.createClass({
  // Render our tweets
  render() {
    // Build list items of single tweet components using map
    const content = this.props.tweets.map((tweet) => {
      return (
        <Tweet key={tweet.tweetId} tweet={tweet} />
      )
    });

    // Return ul filled with our mapped tweets
    return (
      <ul className="tweets">{content}</ul>
    )
  }
});

module.exports = Tweets;