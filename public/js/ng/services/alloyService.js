"use strict";

console.log("OUTSIDE: alloy Service");

//angular.module("main")
app.service("alloyService", function($http) {
  console.log("INSIDE: alloy Service");

  const USERS_URL = "https://jsonplaceholder.typicode.com/users";
  const POSTS_URL = "​https://jsonplaceholder.typicode.com/posts";
  const COMMENTS_URL = "https://jsonplaceholder.typicode.com/comments";

  this.sessionCounter = 0;
  this.authUser = {};

  this.salesSpy = function(params, callback) {
    $http({
      url: "https://trafficspy-api.herokuapp.com/sales-spy",
      method: "POST",
      data: params
    }).then(callback);
  };

  this.trafficSpy = function(params, callback) {
    $http({
      url: "https://trafficspy-api.herokuapp.com/traffic-spy",
      method: "POST",
      data: params
    }).then(callback);
  };

  this.UsersList;

  this.getUsers = function(callback) {
    $http({
      url: USERS_URL,
      method: "GET"
    }).then(callback);
  };
  this.getPosts = function(callback) {
    $http({
      url: POSTS_URL,
      method: "GET"
    }).then(callback);
  };
});
