# React Twitter Stream
This is an ES6 take on a Twitter Stream app [tutorial](https://scotch.io/tutorials/build-a-real-time-twitter-stream-with-node-and-react-js) by amazing team at [Scotch.io](http://scotch.io).

## Requirements

- Node.js
- MongoDB

## Core Dependencies

- Express.js
- Mongoose
- React
- Socket.io
- Twit

## Quick Start

1. `git clone git@github.com:aziz-ka/react-twitter-stream.git` to clone the repo
2. `cd react-twitter-stream` to change into the directory
3. `npm install` to install Node modules
4. supply your Twitter credentials in `config.example.js` (can be found [here](https://apps.twitter.com/))
5. `mv config.example.js config.js` to rename the file
6. in a new terminal tab run `mongod` make sure MongoDB is running
6. `npm start` to start the app
7. go to `localhost:3000` in your browser
8. Enjoy!

**P.S.** *You can pick which tweets you want to steam in `server.js`*
