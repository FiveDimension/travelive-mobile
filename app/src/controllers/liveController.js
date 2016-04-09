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
    $scope.topic="千岛湖";
    $scope.open = function (spot) {
      spot.isOpen = !spot.isOpen;
    };
    $scope.id = $stateParams.id;
  }
];
