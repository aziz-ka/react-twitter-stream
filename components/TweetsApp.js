import React from 'react';
import Tweets from './Tweets';
import Loader from './Loader';
import NotificationBar from './NotificationBar';

const TweetsApp = React.createClass({
  getInitialState(props) {
    props = props || this.props;

    return {
      tweets: props.tweets,
      count: 0,
      page: 0,
      paging: false,
      skip: 0,
      done: false
    };
  },

  componentWillReceiveProps(newProps, oldProps) {
    this.setState(this.getInitialState(newProps));
  },

  // Called directly after component rendering, only on client
  componentDidMount() {
    // Preserve self reference
    const self = this;

    // Initialize socket.io
    const socket = io.connect();

    // On tweet event emission...
    socket.on('tweet', (data) => {
      // Add a tweet to our queue
      self.addTweet(data);
    });

    // Attach scroll event to the window for infinity paging
    window.addEventListener('scroll', this.checkWindowScroll);
  },

  // Method to add a tweet to our timeline
  addTweet(tweet) {
    // Get current application state
    const updated = this.state.tweets;

    // Increment the unread count
    const count = this.state.count + 1;

    // Increment the skip count
    const skip = this.state.skip + 1;

    // Add tweet to the beginning of the tweets array
    updated.unshift(tweet);

    // Set application state
    this.setState({
      tweets: updated,
      count,
      skip
    });
  },

  // Method to show the unread tweets
  showNewTweets() {
    // Get current application state
    const updated = this.state.tweets;

    // Mark our tweets active
    updated.forEach((tweet) => {
      tweet.active = true;
    });

    // Set application state (active tweets + reset unread count)
    this.setState({tweets: updated, count: 0});
  },

  // Method to check if more tweets should be loaded, by scroll position
  checkWindowScroll() {

    // Get scroll pos & window data
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const s = document.body.scrollTop;
    const scrolled = (h + s) > document.body.offsetHeight;

    // If scrolled enough, not currently paging and not complete...
    if(scrolled && !this.state.paging && !this.state.done) {

      // Set application state (Paging, Increment page)
      this.setState({paging: true, page: this.state.page + 1});

      // Get the next page of tweets from the server
      this.getPage(this.state.page);

    }
  },

  // Method to get JSON from server by page
  getPage(page) {
    // Setup our ajax request
    const request = new XMLHttpRequest(), self = this;

    request.open('GET', 'page/' + page + "/" + this.state.skip, true);
    request.onload = () => {
      // If everything is cool...
      if(request.status >= 200 && request.status < 400) {

        // Load our next page
        self.loadPagedTweets(JSON.parse(request.responseText));

      } else {
        // Set application state (Not paging, paging complete)
        self.setState({paging: false, done: true});
      }
    };

    // Fire!
    request.send();
  },

  // Method to load tweets fetched from the server
  loadPagedTweets(tweets) {
    const self = this;

    // If we still have tweets...
    if(tweets.length > 0) {
      // Get current application state
      const updated = this.state.tweets;

      // Push them onto the end of the current tweets array
      tweets.forEach((tweet) => {
        updated.push(tweet);
      });

      // This app is so fast, I actually use a timeout for dramatic effect
      // Otherwise you'd never see our super sexy loader svg
      setTimeout(() => {
        // Set application state (Not paging, add tweets)
        self.setState({tweets: updated, paging: false});
      }, 1000);
    } else {
      // Set application state (Not paging, paging complete)
      this.setState({done: true, paging: false});
    }
  },

  // Render the component
  render() {
    return (
      <div className="tweets-app">
        <Tweets tweets={this.state.tweets} />
        <Loader paging={this.state.paging} />
        <NotificationBar count={this.state.count} onShowNewTweets={this.showNewTweets} />
      </div>
    )
  }
});

module.exports = TweetsApp;