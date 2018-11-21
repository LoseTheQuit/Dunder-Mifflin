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
  $scope.commentsList = alloyService.CommentsList;
  $scope.currentPostIDs = [];

  $scope.findCurrentUser = function() {
    const currentUser = $cookieStore.get("currentUser");
    let userData = {};

    if (currentUser.text)
      alloyService.UsersList.map(user => {
        if (user.email === currentUser.text) {
          userData = user;
        }
      });

    return userData;
  };

  $scope.findCurrentPosts = function(_user) {
    $scope.currentPostIDs = [];
    let userPosts = [];

    alloyService.PostsList.map(user => {
      if (_user.id === user.userId) {
        userPosts.push(user);
        $scope.currentPostIDs.push(user.id);
      }
    });

    alloyService.UserPostsList = userPosts;
    return userPosts;
  };

  $scope.restructurePosts = _comments =>
    new Promise((resolve, reject) => {
      alloyService.CommentsList = _comments;

      console.log($scope.currentPostIDs);

      alloyService.CommentsList.map(comment => {
        if ($scope.currentPostIDs.includes(comment.postId)) {
          alloyService.UserPostsList.map(post => {
            if (comment.postId === post.id) {
              console.log(comment);
              post.comments.push(comment);
            }
          });
        }
      });

      resolve(alloyService.UserPostsList);
    });

  $scope.getPosts = () =>
    new Promise((resolve, reject) => {
      alloyService.getPosts(response => {
        alloyService.PostsList = response.data;
        let newPostData = [];

        response.data.map(post => {
          let obj = {};
          obj = post;
          obj.comments = [];
          newPostData.push(obj);
        });
        resolve(newPostData);
      });
    });

  $scope.getComments = () =>
    new Promise((resolve, reject) => {
      alloyService.getComments(response => {
        alloyService.CommentsList = response.data;
        $scope.commentsList = response.data;
        resolve(response.data);
      });
    });

  $scope.getUsers = _currentPosts =>
    new Promise((resolve, reject) => {
      if ($scope.initialGet) {
        $scope.initialGet = false;
        alloyService.getUsers(response => {
          alloyService.UsersList = response.data;
          $scope.currentUser = $scope.findCurrentUser();

          $scope.findCurrentPosts($scope.currentUser);
          // $scope.currentPosts = $scope.findCurrentPosts($scope.currentUser);
          // $scope.currentPosts = _currentPosts;
          resolve(true);
        });
      }
    });

  // const foo = () => new Promise((resolve, reject) => {});

  $scope
    .getPosts()
    .then(posts => $scope.getUsers())
    .then(someVAR => $scope.getComments())
    .then(comments => $scope.restructurePosts(comments))
    .then(userPostsList => {
      $scope.$apply(function() {
        $scope.currentPosts = userPostsList;
      });
      // $scope.currentPosts = userPostsList;
    });
  // .then(userPostsList => $scope.getComments(userPostsList));

  $scope.deleteCookies = function() {
    console.log("COOOKIES DELETED");
    $cookieStore.put("currentUser", "");
    $window.location.href = "#/home";
  };

  $scope.validate = function(form) {
    $scope.warningMessage = "User Not Found.";

    alloyService.UsersList.map(user => {
      if (user.email === $scope.email.text) {
        $scope.warningMessage = "User Found";
        alloyService.authUser = user;

        $cookieStore.put("currentUser", $scope.email);
        $window.location.href = "#/posts";
      }
    });
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
