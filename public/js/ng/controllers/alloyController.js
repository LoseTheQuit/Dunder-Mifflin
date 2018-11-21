"use strict";

console.log("OUTSIDE: alloy Controller");
app.controller("alloyController", function(
  $scope,
  $http,
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

  $scope.validate = function(form) {
    console.log(form);

    // document.body.appendChild(form);

    $scope.warningMessage = "User Not Found.";

    alloyService.UsersList.map(user => {
      if (user.email === $scope.email.text) {
        alloyService.authenticated = true;
        $scope.warningMessage = "User Found";
        $scope.currentUser = user;

        console.log($scope.currentUser);
        console.log($scope.currentUser);
        console.log($scope.currentUser);

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
