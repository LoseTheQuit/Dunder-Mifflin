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
    // $rootScope.globals = $cookieStore.get("globals") || {};
    // console.log($rootScope.globals);
    //
    // $rootScope.$on("$locationChangeStart", function(event, next, current) {
    //   console.log("ROUTE CHANGE!!!");
    //
    //   // redirect to login page if not logged in and trying to access a restricted page
    //
    //   console.log($rootScope.globals.currentUser);
    //   var loggedIn = $rootScope.globals.currentUser;
    //   if (!loggedIn) {
    //     // $window.location.href = "#/home";
    //     // $location.path("/home");
    //   }
    // });
  });

console.log("INSIDE: main");
