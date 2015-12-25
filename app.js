import React from "react";
import TweetsApp from "./components/TweetsApp";

// Snag the initial state that was passed from the server side
const initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

// Render the components, picking up where react left off on the server
React.render(
  <TweetsApp tweets={initialState}/>,
  document.getElementById('react-app')
);