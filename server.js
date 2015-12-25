import express from "express";
import handlebars from "express-handlebars";
import http from "http";
import mongoose from "mongoose";
import Twit from "twit";
import io from "socket.io";
import routes from "./routes";
import config from "./config";
import streamHandler from "./utils/streamHandler";

const app = express(),
      twitter = new Twit(config.twitter),
      hbs = handlebars.create({
        extname: ".hb",
        defaultLayout: "main"
      });

app.engine("hb", hbs.engine);
app.set("view engine", "hb");

// disables etag headers on responses
app.disable("etag");

mongoose.connect("mongodb://localhost/react-tweets");

app.get(config.indexRoute, routes.index);

app.get(config.pageRoute, routes.page);

app.use("/", express.static(__dirname + "/public/"));

const server = http.createServer(app).listen(config.port, () => {
  console.log("Listening on port " + config.port);
});

const socket = io.listen(server),
      stream = twitter.stream("statuses/filter", { track: "starwars" });

stream.on('tweet', (tweet) => {
  streamHandler(tweet, socket);
});
