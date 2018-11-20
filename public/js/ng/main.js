"use strict";

console.log("OUTSIDE: main");
var app = angular
  .module("main", [
    "ngRoute",
    "ngMaterial",
    "ngAnimate",
    "ngAria",
    "ngMessages",
    "ngLodash"
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

    $routeProvider.otherwise({
      redirectTo: "/home",
      controller: "alloyController"
    });
  });
console.log("INSIDE: main");
