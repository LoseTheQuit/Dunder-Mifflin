"use strict";

console.log("OUTSIDE: main");
var app = angular
  .module("main", [
    "ngRoute",
    "ngMaterial",
    "ngAnimate",
    "ngAria",
    "ngMessages",
    "ngLodash",
    "ngCookies"
  ])
  .config(function($routeProvider, $mdThemingProvider, $mdAriaProvider) {
    $mdThemingProvider
      .theme("default")
      .primaryPalette("grey")
      .accentPalette("indigo");

    $routeProvider.when("/home", {
      templateUrl: "../templates/inject.html",
      controller: "alloyController"
    });

    $routeProvider.when("/posts", {
      templateUrl: "../templates/posts.html",
      controller: "alloyController"
    });

    $routeProvider.otherwise({
      redirectTo: "/home",
      controller: "alloyController"
    });
  })
  .run(function($rootScope, $location, $cookieStore, $http, $window) {
    // keep user logged in after page refresh
    $rootScope.currentUser = $cookieStore.get("currentUser") || {};

    $rootScope.$on("$locationChangeStart", function(event, next, current) {
      // event.preventDefault();
      console.log("ROUTE CHANGE!!!");

      // redirect to login page if not logged in and trying to access a restricted page
      let loggedIn = $rootScope.currentUser.text;

      if (loggedIn) {
        console.log("USER LOGGED IN");
        // $window.location.href = "#/posts";
        // ÷÷
        $location.path("/posts");
      } else {
        console.log("USER --NOT-- LOGGED IN");
        // $window.location.href = "#/home";
        // ÷÷
        $location.path("/home");
      }
    });
  });

console.log("INSIDE: main");
