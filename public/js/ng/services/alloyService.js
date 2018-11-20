'use strict';

console.log("OUTSIDE: alloy Service");

//angular.module("main")
app.service('alloyService', function($http) {

  console.log("INSIDE: alloy Service");

  this.sessionCounter = 0;

  this.salesSpy = function(params, callback) {
    $http({
      url: 'https://trafficspy-api.herokuapp.com/sales-spy',
      method: "POST",
      data: params
    }).then(callback);
  }

  this.trafficSpy = function(params, callback) {
    $http({
      url: 'https://trafficspy-api.herokuapp.com/traffic-spy',
      method: "POST",
      data: params
    }).then(callback);
  }

  this.getVotes = function(callback) {
    $http({
      url: '/calexit',
      method: "GET"
    }).then(callback);
  };

  this.postVotes = function(params, callback) {
    $http({
      url: '/calexit',
      method: "POST",
      data: params
    }).then(callback);

  };
  this.postQuestionOne = function(params, callback) {
    $http({
      url: '/calexit-question-1',
      method: "POST",
      data: params
    }).then(callback);

  };

  this.delAllVotes = function(id, callback) {
    console.log("success from delHomeBrew");

    $http({
      url: '/del-all/',
      method: "GET"
    }).then(callback);

  };

  this.getVoteCount = function(callback) {
    $http({
      url: '/get-count',
      method: "GET"
    }).then(callback);

  };

  this.writeToDisk = function(query, callback) {
    console.log("success from getHomeBrew");

    $http({
      url: '/write',
      method: "POST",
      data: query
    }).then(callback);

  };

  this.handShake = function(callback) {
    $http({
      url: 'http://ipinfo.io',
      method: "get"
    }).then(callback);

  };

  // DEPRECATED
  this.getVoteSplitCount = function(callback) {
    $http({
      url: '/split-query',
      method: "POST"
    }).then(callback);

  };

});