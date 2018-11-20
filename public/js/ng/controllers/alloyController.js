"use strict";

console.log("OUTSIDE: alloy Controller");
app.controller("alloyController", function(
  $scope,
  $http,
  alloyService,
  lodash
) {
  console.log("INSIDE: alloy Controller");

  $scope.getUsers = function(x) {};

  // https://jsonplaceholder.typicode.com/users

  $scope.trafficSpy = function(x) {
    var dataToSend = {};

    $.get("https://api.ipify.org?format=json", function(data, error) {
      dataToSend.ip = data.ip;
      dataToSend.site = "MMTR";
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
