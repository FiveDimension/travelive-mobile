'use strict';

/**
 * @ngdoc function
 * @name Travelive.controller:ItineraryController
 * @description
 * # HomeController
 */
module.exports = [
  '$scope',
  'ExampleService',
  '$state',
  '$ionicHistory',
  '$http',
  '$stateParams',

  function ($scope, ExampleService, $state, $ionicHistory, $http, $stateParams) {
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    $scope.input = {};
    $scope.input.title="千岛湖直播";
    $scope.input.jingdian="千岛湖";

    $scope.startLive = function () {
      console.log("startLive", $scope.jingdian);
      var option = {
        title: $scope.input.title,
        jingdian:  $scope.input.jingdian
      };
      window.open("rtmp://123.56.225.149/myapp/b", "_live", JSON.stringify(option));
    };
  }
];
