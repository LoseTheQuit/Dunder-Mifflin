"use strict";

console.log("OUTSIDE: alloy Controller");
app.controller("alloyController", function(
  $scope,
  $http,
  $cookies,
  $cookieStore,
  $window,
  $rootScope,
  $location,
  alloyService,
  lodash
) {
  console.log("INSIDE: alloy Controller");

  $scope.initialGet = true;
  $scope.currentUser = {};
  $scope.warningMessage = "";
  $scope.postsList = alloyService.PostsList;

  $scope.findCurrentUser = function() {
    const currentUser = $cookieStore.get("currentUser");
    console.log(currentUser);
    console.log();
    let userData = {};
    if (currentUser.text)
      alloyService.UsersList.map(user => {
        if (user.email === currentUser.text) {
          userData = user;
        }
      });
    return userData;
  };

  $scope.validate = function(form) {
    // console.log(form);
    // document.body.appendChild(form);

    $scope.warningMessage = "User Not Found.";

    alloyService.UsersList.map(user => {
      if (user.email === $scope.email.text) {
        $scope.warningMessage = "User Found";
        alloyService.authUser = user;

        $scope.getPosts();
        $cookieStore.put("currentUser", $scope.email);

        // $scope.currentUser = user;
        // $cookieStore.put("currentUser", $scope.email.text);

        $window.location.href = "#/posts";
      }
    });
  };

  $scope.getUsers = function() {
    if ($scope.initialGet) {
      $scope.initialGet = false;
      alloyService.getUsers(response => {
        alloyService.UsersList = response.data;
        $scope.currentUser = $scope.findCurrentUser();
      });
    }
  };

  $scope.getUsers();

  $scope.deleteCookies = function() {
    console.log("COOOKIES DELETED");
    $cookieStore.put("currentUser", "");
    $window.location.href = "#/home";
  };

  $scope.getPosts = function() {
    if ($scope.initialGet) {
      $scope.initialGet = false;

      alloyService.getPosts(response => {
        console.log(response);
        alloyService.PostsList = response.data;
      });
    }
  };

  $scope.trafficSpy = function(x) {
    var dataToSend = {};

    $.get("https://api.ipify.org?format=json", function(data, error) {
      dataToSend.ip = data.ip;
      dataToSend.site = "DUNDER";
      dataToSend.referrer = document.referrer;
      dataToSend.vendor = navigator.vendor;
      dataToSend.userAgent = navigator.userAgent;
      dataToSend.platform = navigator.platform;
      dataToSend.language = navigator.language;
      dataToSend.hostname = window.location.hostname;

      if (document.referrer) {
        dataToSend.referrer = document.referrer;
      } else {
        dataToSend.referrer = "Direct";
      }

      if (error === "success") {
        console.log(`traffic-spy`);
        console.log(error);

        alloyService.trafficSpy(dataToSend, function(response) {
          console.log(response);
        });
      }
    });
  };

  let windowLocation = window.location.href;

  if (!windowLocation.includes("localhost")) {
    if (windowLocation.includes("home") && alloyService.sessionCounter === 0) {
      alloyService.sessionCounter++;
      $scope.trafficSpy();
    }
  }
});
