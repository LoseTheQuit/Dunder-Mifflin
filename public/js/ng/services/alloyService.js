"use strict";

console.log("OUTSIDE: alloy Service");

//angular.module("main")
app.service("alloyService", function($http) {
  console.log("INSIDE: alloy Service");

  const USERS_URL = "https://jsonplaceholder.typicode.com/users";
  const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
  const COMMS_URL = "https://jsonplaceholder.typicode.com/comments";

  this.sessionCounter = 0;
  this.authUser = {};

  this.UsersList = [];
  this.PostsList = [];
  this.UserPostsList = [];
  this.CommentsList = [];

  this.setComments = comments => {
    this.CommentsList = comments;
  };

  this.getComments = () => {
    return this.CommentsList;
  };

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

  this.getComments = function(callback) {
    $http({
      url: COMMS_URL,
      method: "GET"
    }).then(callback);
  };

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
