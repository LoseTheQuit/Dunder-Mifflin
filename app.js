"use strict";

let fs = require("fs"),
  mongojs = require("mongojs"),
  colors = require("colors"),
  express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  https = require("https"),
  http = require("http"),
  Twitter = require("twitter"),
  request = require("request"),
  querystring = require("querystring"),
  cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("/bower_components", express.static(__dirname + "/bower_components"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use(express.static("public"));

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const port = process.env.PORT || 1119;
app.set("port", port);

app.listen(app.get("port"), function() {
  console.log("\n");
  console.log("***************************************".black.bgWhite);
  console.log(`The frontend server is running on ${port}!`.black.bgWhite);
  console.log("***************************************".black.bgWhite);
  console.log("\n");
});

app.get("/", function(req, res) {
  console.log("\n");
  console.log("*** INCOMING GET REQUEST - Load Template ***".black.bgWhite);
  console.log("\n");

  var html = fs.readFileSync("public/views/base.html");
  res.end(html);
});
